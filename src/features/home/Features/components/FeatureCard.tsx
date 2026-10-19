"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import type { FeatureItem } from "../types";

interface FeatureCardProps {
  item: FeatureItem;
  index: number;
}

export function FeatureCard({ item, index }: FeatureCardProps) {
  const t = useTranslations(`features.items.${item.key}`);
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group p-6 md:p-8 border border-neutral-800 hover:border-brand/40 transition-colors duration-300"
    >
      <div className="w-12 h-12 flex items-center justify-center border border-brand/30 text-brand-foreground/80 mb-6 group-hover:bg-brand/10 transition-colors duration-300">
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="text-xl font-bold mb-3">{t("title")}</h3>
      <p className="text-neutral-400 text-sm leading-relaxed">{t("description")}</p>
    </motion.div>
  );
}
