"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui";
import { ContactForm, ContactInfo } from "./components";

export function Contact() {
  const t = useTranslations("contact");

  return (
    <section id="contact" className="scroll-mt-24 py-24 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <SectionHeader
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
    </section>
  );
}
