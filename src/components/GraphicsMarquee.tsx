"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui";
import { graphicsSamples } from "@/lib";
import { Marquee } from "./Marquee";
import { Reveal } from "./Reveal";

export function GraphicsMarquee() {
  const t = useTranslations("graphics");
  const half = Math.ceil(graphicsSamples.length / 2);
  const rows = [
    graphicsSamples.slice(0, half),
    graphicsSamples.slice(half),
  ];

  return (
    <section id="graphics" className="border-t border-neutral-800 bg-black py-20">
      <div className="container mx-auto">
        <Reveal>
          <SectionHeader
            label={t("label")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-neutral-400">
            {t("note")}
          </p>
        </Reveal>
      </div>

      <div className="mt-12 space-y-4">
        {rows.map((row, rowIndex) => (
          <Marquee
            key={rowIndex}
            duration={rowIndex === 0 ? 58 : 72}
            reverse={rowIndex === 1}
          >
            {row.map((src, index) => (
              <figure
                key={`${rowIndex}-${src}-${index}`}
                className="mx-2 h-44 w-64 shrink-0 overflow-hidden border border-white/10 bg-neutral-900 md:h-56 md:w-80"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </figure>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
