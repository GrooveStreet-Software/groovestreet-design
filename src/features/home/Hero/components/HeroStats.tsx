"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";

interface Stat {
  value: string;
  count: number;
  label: string;
}

/** 0 → target in ~2.2s with a gentle ease-out curve. */
function useCountUp(target: number, start: boolean, delay = 0, duration = 2200) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!start) return;
    let frame = 0;
    let timeout = 0;
    let t0 = 0;

    const tick = (now: number) => {
      if (!t0) t0 = now;
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(target * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };

    timeout = window.setTimeout(() => {
      frame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [start, target, delay, duration]);

  return display;
}

function StatItem({ stat, start, index }: { stat: Stat; start: boolean; index: number }) {
  const value = useCountUp(stat.count, start, index * 120);
  // The suffix is whatever follows the digits ("+", "%").
  const suffix = stat.value.replace(/^\d+/, "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={start ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative"
      style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
    >
      <dt className="sr-only">{stat.label}</dt>
      <dd className="text-4xl md:text-5xl font-bold tracking-tighter text-white tabular-nums">
        {value}
        {suffix}
      </dd>
      <dd className="mt-2 h-px w-8 bg-brand/60" />
      <dd className="mt-3 text-xs uppercase tracking-widest text-white/60">{stat.label}</dd>
    </motion.div>
  );
}

/**
 * Headline stats. The numbers count up when the block scrolls into view, and
 * each is paired with a short label — long captions turned the row into a wall
 * of text.
 */
export function HeroStats() {
  const t = useTranslations("stats");
  const items = t.raw("items") as Stat[];
  const ref = useRef<HTMLDListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.dl
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4"
    >
      {items.map((item, index) => (
        <StatItem key={item.label} stat={item} start={inView} index={index} />
      ))}
    </motion.dl>
  );
}
