"use client";

import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { useTranslations } from "next-intl";

export function HeroScrollIndicator() {
  const t = useTranslations("hero");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.4 }}
      className="mt-10 flex justify-center"
    >
      <a
        href="#features"
        className="group flex items-center gap-4 border border-neutral-800 px-8 py-4 transition-colors duration-300 hover:border-brand/50 hover:bg-white/[0.02]"
      >
        <div className="text-xs uppercase tracking-widest text-neutral-400 transition-colors group-hover:text-white">
          {t("build")}
        </div>
        <div className="h-px w-10 bg-neutral-800 transition-colors group-hover:bg-brand/60" />
        <ArrowDown className="h-4 w-4 text-neutral-400 transition-all duration-300 group-hover:translate-y-1 group-hover:text-white" />
      </a>
    </motion.div>
  );
}
