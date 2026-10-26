"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Direction-aware scroll reveal.
 *
 * Animations reverse when the visitor scrolls back up: the element only stays
 * in its "revealed" state while it is on screen, so scrolling away — in either
 * direction — returns it to the hidden state and the next pass replays it.
 *
 * This is deliberately NOT IntersectionObserver's `once: true` behaviour, which
 * locks elements revealed forever.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: { threshold?: number; rootMargin?: string } = {}
) {
  const { threshold = 0.15, rootMargin = "0px 0px -40px 0px" } = options;
  const ref = useRef<T | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setRevealed(entry.isIntersecting);
          if (entry.isIntersecting) setCount((c) => c + 1);
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, revealed, count };
}
