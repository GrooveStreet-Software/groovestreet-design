"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui";
import { Reveal } from "@/components";
import { featureItems } from "./constants";
import { FeatureCard } from "./components";

export function Features() {
  const t = useTranslations("features");

  return (
    <section
      id="features"
      className="py-24 relative overflow-hidden bg-gradient-to-b from-black to-neutral-900"
    >
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <Reveal>
          <SectionHeader
            label={t("label")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>

        <p className="text-brand-foreground/70 text-xs uppercase tracking-widest mb-8">
          {t("note")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureItems.map((feature, index) => (
            <Reveal key={feature.key} delay={index * 100} as="article">
              <FeatureCard item={feature} index={index} />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="absolute top-20 end-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 start-10 w-60 h-60 bg-white/3 rounded-full blur-3xl"></div>
    </section>
  );
}
