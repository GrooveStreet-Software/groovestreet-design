"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { FeatureItem } from "../types";

interface FeatureCardProps {
  item: FeatureItem;
  index: number;
}

export function FeatureCard({ item, index }: FeatureCardProps) {
  const t = useTranslations(`features.items.${item.key}`);
  const tSection = useTranslations("features");
  const Icon = item.icon;
  const image = t("image") as string;

  return (
    <a
      href={`#pricing-${item.pricingKey}`}
      className="group flex h-full flex-col overflow-hidden border border-neutral-800 bg-neutral-950 transition-colors duration-300 hover:border-brand/40"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <span className="absolute bottom-3 end-4 text-5xl font-bold leading-none text-white/25 select-none">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/25 bg-black/50 text-white transition-colors duration-300 group-hover:border-brand group-hover:bg-brand">
            <Icon className="h-5 w-5" />
          </div>
          <h3 className="text-xl font-bold text-white">{t("title")}</h3>
        </div>

        <p className="text-sm leading-relaxed text-white/80">{t("need")}</p>

        <p className="mt-auto text-sm leading-relaxed text-white/45">
          {t("why")}
        </p>

        <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-white/40 transition-colors group-hover:text-white">
          {tSection("pricingCta")}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </a>
  );
}
