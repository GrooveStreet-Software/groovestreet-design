"use client";

import { useTranslations } from "next-intl";
import type { ProcessStepItem } from "../types";

interface ProcessStepProps {
  step: ProcessStepItem;
}

export function ProcessStep({ step }: ProcessStepProps) {
  const t = useTranslations(`process.steps.${step.key}`);

  return (
    <div className="relative flex gap-6 md:gap-10">
      <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-full bg-brand/10 border-2 border-brand/30 flex items-center justify-center">
        <span className="text-xl md:text-2xl font-bold text-brand-foreground">
          {step.number}
        </span>
      </div>
      <div className="flex-1 pb-10 md:pb-14">
        <h3 className="text-xl md:text-2xl font-bold mb-3 text-white">
          {t("title")}
        </h3>
        <p className="text-neutral-400 text-base md:text-lg leading-relaxed max-w-xl">
          {t("description")}
        </p>
      </div>
    </div>
  );
}
