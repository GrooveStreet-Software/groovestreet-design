"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";

/**
 * Animated headline stats. Deliberately label-free in the markup flow: the
 * numbers are the statement, the caption sits under them as supporting text.
 */
export function HeroStats() {
  const t = useTranslations("stats");
  const items = t.raw("items") as { value: string; label: string }[];

  return (
    <motion.dl
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
      className="mt-14 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4"
    >
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
          className="relative"
          style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
        >
          <dt className="sr-only">{item.label}</dt>
          <dd className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
            {item.value}
          </dd>
          <dd className="mt-2 h-px w-8 bg-brand/60" />
        </motion.div>
      ))}
    </motion.dl>
  );
}
