"use client";

import { useTranslations } from "next-intl";
import type { FeatureItem } from "../types";

interface FeatureCardProps {
  item: FeatureItem;
  index: number;
}

export function FeatureCard({ item, index }: FeatureCardProps) {
  const t = useTranslations(`features.items.${item.key}`);
  const Icon = item.icon;
  const image = t("image") as string;

  return (
    <div className="group relative overflow-hidden border border-neutral-800 hover:border-brand/40 transition-colors duration-300 min-h-[380px] flex flex-col">
      {/* Background image - sharp at rest, blurred on hover so the text wins */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={t("title")}
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:blur-md group-hover:scale-105 group-hover:brightness-[0.35]"
        />
      </div>

      {/* Icon chip + title */}
      <div className="relative z-10 p-6 md:p-8">
        <div className="w-12 h-12 flex items-center justify-center border border-white/25 bg-black/50 backdrop-blur-sm text-white mb-6 transition-colors duration-300 group-hover:bg-brand group-hover:border-brand">
          <Icon className="w-5 h-5" />
        </div>

        <h3 className="relative z-10 text-xl font-bold mb-3 text-white drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
          {t("title")}
        </h3>
      </div>

      {/* The "why" - hidden at rest, revealed on hover */}
      <div className="relative z-10 mt-auto p-6 md:p-8 pt-0">
        <p className="text-sm leading-relaxed text-white/0 group-hover:text-white/85 transition-all duration-500 ease-out max-h-0 group-hover:max-h-48 opacity-0 group-hover:opacity-100 overflow-hidden">
          {t("why")}
        </p>
      </div>

      {/* Index watermark */}
      <span className="absolute bottom-4 end-6 text-5xl font-bold text-white/10 select-none">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}
