"use client";

import { SectionHeader } from "@/components/ui";
import { FloatingCursor, Reveal } from "@/components";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { Navbar, Footer } from "@/layouts";
import { samplePreviews } from "@/lib";

export default function SamplesPage() {
  const t = useTranslations("samples");

  return (
    <main className="bg-black text-white min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 md:px-8 py-24 flex-1">
        <Reveal>
          <SectionHeader
            label={t("label")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {samplePreviews.map((sample, index) => (
            <Reveal key={sample.key} delay={index * 100} as="article">
              <a
                href={sample.file}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-neutral-800 hover:border-brand/40 transition-colors duration-300 overflow-hidden block"
              >
                <div className="aspect-[16/10] bg-neutral-900 relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={sample.image}
                    alt={t(`items.${sample.messageKey}.title`)}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <span className="text-white text-sm font-bold uppercase tracking-widest">
                      {t("openPreview")}
                    </span>
                    <ExternalLink size={16} className="text-white" />
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-1">
                    {t(`items.${sample.messageKey}.title`)}
                  </h3>
                  <p className="text-brand-foreground/60 text-xs uppercase tracking-widest mb-2">
                    {t(`items.${sample.messageKey}.subtitle`)}
                  </p>
                  <p className="text-neutral-400 text-sm">
                    {t(`items.${sample.messageKey}.description`)}
                  </p>
                  <p className="text-neutral-500 text-xs mt-3 flex items-center gap-1.5">
                    <ExternalLink size={12} />
                    {t("newTabHint")}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
      <Footer />
      <FloatingCursor />
    </main>
  );
}
