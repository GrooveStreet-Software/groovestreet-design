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
      className="absolute bottom-10 inset-x-0 flex justify-center"
    >
      <div className="flex items-center gap-4 border border-neutral-800 px-8 py-4">
        <div className="text-xs uppercase tracking-widest text-neutral-400">
          {t("build")}
        </div>
        <div className="h-px w-10 bg-neutral-800" />
        <motion.span
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="text-neutral-400"
        >
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </div>
    </motion.div>
  );
}
