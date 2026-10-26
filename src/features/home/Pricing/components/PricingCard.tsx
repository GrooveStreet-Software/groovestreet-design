"use client";

import { Check } from "lucide-react";
import { useTranslations, useFormatter } from "next-intl";
import { Button } from "@/components/ui";
import type { PricingPlanItem } from "../types";

interface PricingCardProps {
  plan: PricingPlanItem;
  /** Current currency selection for the converter. */
  currency: "UGX" | "USD";
  onCta: () => void;
}

export function PricingCard({ plan, currency, onCta }: PricingCardProps) {
  const t = useTranslations("pricing");
  const format = useFormatter();
  const features = t.raw(`plans.${plan.key}.features`) as string[];

  const price = plan.price;

  return (
    <div
      id={`pricing-${plan.key}`}
      className={`relative scroll-mt-28 p-8 bg-white/5 backdrop-blur-sm group transition-all duration-300 border-2 target:border-brand target:bg-white/[0.08] ${
        plan.popular
          ? "border-white"
          : "border-white/20 hover:border-brand/40"
      }`}
    >
      {plan.popular && (
        <div className="absolute top-0 end-0 bg-white text-black text-xs uppercase tracking-widest py-1 px-3 -mt-3 -me-3 font-medium">
          {t("popular")}
        </div>
      )}

      <h3 className="text-2xl font-bold mb-2 text-white">
        {t(`plans.${plan.key}.name`)}
      </h3>
      <p className="text-white/70 mb-6">{t(`plans.${plan.key}.description`)}</p>

      <div className="mb-6 min-w-0">
        <div className="flex items-baseline gap-1 text-2xl font-bold text-white md:text-3xl lg:text-[1.75rem]">
          {plan.from && (
            <span className="text-sm font-normal text-white/60">
              {t("from")}
            </span>
          )}
          <span>
            {format.number(price, {
              style: "currency",
              currency,
              maximumFractionDigits: currency === "USD" ? 0 : 0,
            })}
          </span>
        </div>
        <p className="mt-1 text-sm text-white/60">
          {t(`plans.${plan.key}.timeline`)}
        </p>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature) => (
          <li key={feature} className="flex items-start group">
            <Check className="w-5 h-5 me-2 text-brand-foreground/70 group-hover:text-white flex-shrink-0 mt-0.5 transition-colors duration-300" />
            <span className="text-white/80 group-hover:text-white transition-colors duration-300">
              {feature}
            </span>
          </li>
        ))}
      </ul>

      <Button
        variant={plan.popular ? "primary" : "outline"}
        className="w-full"
        onClick={onCta}
        aria-haspopup="dialog"
      >
        {t(`plans.${plan.key}.cta`)}
      </Button>

      {plan.popular && (
        <div className="absolute inset-0 border-b-2 border-white opacity-20 pointer-events-none"></div>
      )}
    </div>
  );
}
