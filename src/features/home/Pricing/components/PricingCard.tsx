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
      className={`relative p-8 bg-white/5 backdrop-blur-sm group transition-all duration-300 border-2 ${
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

      <div className="mb-6 flex items-baseline">
        <span className="text-3xl md:text-4xl font-bold text-white">
          {format.number(price, {
            style: "currency",
            currency,
            maximumFractionDigits: currency === "USD" ? 0 : 0,
          })}
        </span>
        <span className="text-white/70 ms-2">
          {t(`plans.${plan.key}.timeline`)}
        </span>
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
      >
        {t(`plans.${plan.key}.cta`)}
      </Button>

      {plan.popular && (
        <div className="absolute inset-0 border-b-2 border-white opacity-20 pointer-events-none"></div>
      )}
    </div>
  );
}
