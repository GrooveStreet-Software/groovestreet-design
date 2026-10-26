"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";

export function HeroServiceSwitch() {
  const t = useTranslations("hero.serviceSwitch");
  const services = t.raw("services") as string[];
  const shouldReduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion || services.length < 2) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % services.length);
    }, 2800);

    return () => window.clearInterval(timer);
  }, [services.length, shouldReduceMotion]);

  const current = services[index];

  return (
    <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
      <span className="text-[10px] uppercase tracking-[0.35em] text-neutral-500">
        {t("prefix")}
      </span>
      <span className="sr-only">{t("accessible")}</span>
      <span
        aria-hidden="true"
        className="relative inline-flex h-9 min-w-[11rem] items-center overflow-hidden md:h-11 md:min-w-[15rem]"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={current}
            initial={shouldReduceMotion ? false : { y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { y: "-100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl font-bold uppercase tracking-tight text-white md:text-3xl"
          >
            {current}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
