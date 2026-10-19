"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import type { ProcessStepItem } from "../types";

interface ProcessStepProps {
  step: ProcessStepItem;
  index: number;
}

export function ProcessStep({ step, index }: ProcessStepProps) {
  const t = useTranslations(`process.steps.${step.key}`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative"
    >
      <span className="text-6xl font-bold text-brand/15 absolute -top-4 -left-2 select-none">
        {step.number}
      </span>
      <div className="relative pl-4">
        <h3 className="text-lg font-bold mb-2">{t("title")}</h3>
        <p className="text-neutral-400 text-sm">{t("description")}</p>
      </div>
    </motion.div>
  );
}
