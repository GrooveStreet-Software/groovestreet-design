"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ExternalLink, Loader2, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui";
import { Reveal } from "@/components";
import { Link } from "@/i18n/navigation";

/**
 * Live sample.
 *
 * The site renders in place inside a modal iframe, so the visitor never has to
 * leave the landing page to see what we build. A screenshot stands in behind the
 * frame while it loads, and there is a clear path out to the full site.
 */
export function LiveSample() {
  const t = useTranslations("liveSample");
  const url = t("url");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => {
    setOpen(false);
  };

  return (
    <section id="samples" className="py-24 relative overflow-hidden bg-[#0a0a0a]">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <Reveal>
          <SectionHeader
            label={t("label")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <div className="relative border border-neutral-800 hover:border-brand/50 transition-colors duration-300 overflow-hidden">
            <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-neutral-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/hotel-assets/h1_hero.jpg"
                alt="Hotel GrooveStreet — live website"
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

              <div className="absolute top-4 start-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm border border-white/15 px-3 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-xs uppercase tracking-widest text-white font-medium">
                  {t("liveBadge")}
                </span>
              </div>

              <div className="absolute bottom-0 inset-x-0 p-6 md:p-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div className="max-w-xl">
                  <p className="text-white text-xl md:text-2xl font-bold mb-2">
                    Hotel GrooveStreet
                  </p>
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    {t("description")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(true);
                  }}
                  className="inline-flex items-center gap-2 bg-white text-black px-5 py-3 text-sm uppercase tracking-widest font-medium shrink-0 hover:bg-brand hover:text-white transition-colors"
                >
                  {t("cta")}
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={220} className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            href="/samples"
            className="text-neutral-400 hover:text-white transition-colors text-xs uppercase tracking-widest underline underline-offset-4"
          >
            {t("viewAll")}
          </Link>
        </Reveal>
      </div>

      {/* ---------------- In-page preview ---------------- */}

      {/* Backdrop, behind the preview, only while it is open. */}
      {open && (
        <div
          className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-sm"
          onClick={close}
        />
      )}

      {/*
        The frame stays mounted for the life of the page. While the preview is
        closed it is parked off-screen and invisible, which lets the live site
        finish loading in the background — opening the preview is then instant
        rather than a ~13s spinner.
      */}
      <div
        className={
          open
            ? "fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8"
            : "pointer-events-none fixed -left-[9999px] top-0 h-[600px] w-[1280px] opacity-0"
        }
        {...(open
          ? { role: "dialog" as const, "aria-modal": true, "aria-label": t("cta") }
          : { "aria-hidden": true })}
      >
        <div
          className={`relative flex w-full flex-col bg-neutral-950 border border-neutral-800 ${
            open ? "h-[85vh] max-w-6xl" : "h-full max-w-none"
          }`}
        >
          {/* Browser chrome */}
          {open && (
            <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-800 bg-neutral-900">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              </div>
              <div className="flex-1 flex items-center gap-2 bg-black/60 px-3 py-1.5 text-xs text-neutral-400 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="truncate" dir="ltr">{url}</span>
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors p-1.5"
                aria-label={t("newTabHint")}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={close}
                className="text-neutral-400 hover:text-white transition-colors p-1.5"
                aria-label="Close preview"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          <div className="relative flex-1 min-h-0">
            {loading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-neutral-950 text-neutral-400">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-xs uppercase tracking-widest">
                  Loading live site…
                </span>
              </div>
            )}
            <iframe
              src={url}
              title="Hotel GrooveStreet — live preview"
              onLoad={() => setLoading(false)}
              className="w-full h-full border-0"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </div>
        </div>
      </div>

      <div className="absolute top-20 end-20 w-40 h-40 border border-white/5"></div>
      <div className="absolute bottom-20 start-20 w-60 h-60 border border-white/5"></div>
    </section>
  );
}
