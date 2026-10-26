"use client";

import { useTranslations } from "next-intl";

interface CurrencyToggleProps {
  currency: "UGX" | "USD";
  onToggle: (currency: "UGX" | "USD") => void;
}

export function CurrencyToggle({ currency, onToggle }: CurrencyToggleProps) {
  const t = useTranslations("pricing");

  const options: { key: "UGX" | "USD"; label: string }[] = [
    { key: "UGX", label: t("ugx") },
    { key: "USD", label: t("usd") },
  ];

  return (
    <div className="flex flex-col items-center gap-2 mb-10">
      <div className="text-xs uppercase tracking-widest text-white/60">
        {t("currencyToggle")}
      </div>
      <div
        role="group"
        aria-label={t("currencyToggle")}
        className="border-2 border-white/20 p-1 inline-flex rounded-sm backdrop-blur-sm bg-white/5"
      >
        {options.map((option) => (
          <button
            key={option.key}
            onClick={() => onToggle(option.key)}
            aria-pressed={currency === option.key}
            className={`px-6 py-2 text-sm transition-all duration-300 ${
              currency === option.key
                ? "bg-white text-black font-medium"
                : "text-white/70 hover:text-white"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <p className="text-white/40 text-xs mt-1">{t("rateNote")}</p>
    </div>
  );
}
