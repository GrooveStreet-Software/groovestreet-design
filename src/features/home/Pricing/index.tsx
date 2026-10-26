"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui";
import { Reveal } from "@/components";
import { pricingPlans } from "./constants";
import { CurrencyToggle, PricingCard } from "./components";

/** Indicative rate, used only for the on-page currency preview. */
const UGX_PER_USD = 3700;

export function Pricing() {
  const t = useTranslations("pricing");
  const [currency, setCurrency] = useState<"UGX" | "USD">("UGX");

  const scrollToContact = () =>
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section
      id="pricing"
      className="py-24 relative overflow-hidden bg-[#0a0a0a]"
    >
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <Reveal>
          <SectionHeader label={t("label")} title={t("title")} />
        </Reveal>

        <Reveal delay={100}>
          <CurrencyToggle currency={currency} onToggle={setCurrency} />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingPlans.map((plan) => (
            <Reveal key={plan.key} delay={150} as="article">
              <PricingCard
                plan={{
                  ...plan,
                  price:
                    currency === "USD"
                      ? Math.round(plan.price / UGX_PER_USD)
                      : plan.price,
                }}
                currency={currency}
                onCta={scrollToContact}
              />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="absolute top-40 start-10 w-32 h-32 border border-white/10"></div>
      <div className="absolute bottom-20 end-10 w-48 h-48 border-2 border-white/5"></div>
    </section>
  );
}
