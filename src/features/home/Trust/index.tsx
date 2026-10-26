"use client";

import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui";
import { Marquee, Reveal } from "@/components";

/**
 * The clients named in the testimonials on this site, shown as wordmarks.
 * We render names rather than invented logo marks — these are real businesses
 * we have worked with, and we do not own their brand assets.
 */
const CLIENTS = [
  "Kampala Restaurant",
  "Okello Designs",
  "Achieng Academy",
  "Ssemwanga Motors",
  "Mukasa Events",
  "Kigozi Pharmacy",
  "Hotel GrooveStreet",
];

export function Trust() {
  const t = useTranslations("trust");

  return (
    <section className="py-24 relative overflow-hidden bg-black">
      <div className="container mx-auto relative z-10">
        <Reveal>
          <SectionHeader
            label={t("label")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>

        <Reveal
          delay={140}
          className="mt-10 flex items-center justify-center gap-3 text-white/70"
        >
          <ShieldCheck className="w-5 h-5 shrink-0" />
          <span className="text-xs uppercase tracking-widest">
            {t("partnersLabel")}
          </span>
        </Reveal>
      </div>

      <Reveal delay={200} className="mt-8">
        <Marquee duration={36}>
          {CLIENTS.map((name) => (
            <span
              key={name}
              className="mx-8 whitespace-nowrap text-lg font-bold tracking-tight text-white/25"
            >
              {name}
            </span>
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
