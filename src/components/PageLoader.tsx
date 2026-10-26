"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type LoaderState = "visible" | "leaving" | "hidden";

const MIN_VISIBLE_MS = 300;
const FADE_MS = 450;
const MAX_WAIT_MS = 2500;

/**
 * Full-page loader.
 *
 * It is part of the server-rendered HTML so it covers the page from the first
 * paint, then waits for the document, fonts and two animation frames before it
 * fades. Client-side route changes replay a short version of the same cover.
 * The max-wait guard means a slow third-party asset can never lock the site.
 */
export function PageLoader() {
  const pathname = usePathname();
  const [state, setState] = useState<LoaderState>("visible");
  const firstRender = useRef(true);
  const timers = useRef<number[]>([]);

  const schedule = (callback: () => void, delay: number) => {
    const id = window.setTimeout(callback, delay);
    timers.current.push(id);
    return id;
  };

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };

  const finish = () => {
    setState("leaving");
    schedule(() => setState("hidden"), FADE_MS);
  };

  useEffect(() => {
    let cancelled = false;

    const waitForPaint = () =>
      new Promise<void>((resolve) => {
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      });

    const waitForAssets = async () => {
      if (document.fonts?.ready) {
        await document.fonts.ready;
      }
      if (document.readyState !== "complete") {
        await new Promise<void>((resolve) => {
          window.addEventListener("load", () => resolve(), { once: true });
        });
      }
      await waitForPaint();
    };

    const minimum = new Promise<void>((resolve) => {
      window.setTimeout(resolve, MIN_VISIBLE_MS);
    });

    Promise.race([
      Promise.all([waitForAssets(), minimum]),
      new Promise<void>((resolve) => {
        window.setTimeout(resolve, MAX_WAIT_MS);
      }),
    ]).then(() => {
      if (!cancelled) finish();
    });

    return () => {
      cancelled = true;
      clearTimers();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    clearTimers();
    setState("visible");
    schedule(() => finish(), 300);

    return () => clearTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (state === "hidden") return;

    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";

    return () => {
      root.style.overflow = previous;
    };
  }, [state]);

  if (state === "hidden") return null;

  return (
    <>
      <noscript>
        <style>{`.page-loader{display:none!important}`}</style>
      </noscript>
      <div
        className={`page-loader fixed inset-0 z-[100] flex flex-col items-center justify-center gap-7 bg-black transition-opacity duration-500 ${
          state === "leaving" ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        role="status"
        aria-live="polite"
        aria-label="Loading page"
      >
        <span className="text-xl font-bold tracking-[0.28em] text-white md:text-2xl">
          GROOVESTREET
        </span>
        <div className="h-px w-48 overflow-hidden bg-white/15">
          <span className="gs-loader-bar block h-full w-1/3 bg-brand" />
        </div>
        <span className="text-[10px] uppercase tracking-[0.42em] text-white/40">
          Design · Build · Ship
        </span>
      </div>
    </>
  );
}
