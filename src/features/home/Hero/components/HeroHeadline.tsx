"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { heroHeadlines } from "../constants";

export function HeroHeadline() {
  const t = useTranslations("hero.headline");

  return (
    <h1 className="-ms-[0.06em]">
      {heroHeadlines.map((headline, index) => (
        <span
          key={headline.key}
          className="block overflow-hidden pb-[0.08em]"
        >
          <motion.span
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.9,
              delay: 0.15 + index * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`block text-5xl font-bold leading-[0.95] tracking-tighter md:text-7xl lg:text-8xl ${headline.className}`}
          >
            {t(headline.key)}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
