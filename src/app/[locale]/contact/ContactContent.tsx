"use client";

import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Clock, ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/ui";
import { Footer } from "@/layouts";
import { FloatingCursor } from "@/components";
import { contactDetails, whatsappUrl, mailtoUrl, telUrl } from "@/lib";

export function ContactContent() {
  const t = useTranslations("pages.contact");
  const tInfo = useTranslations("contact.info");

  return (
    <main className="bg-black text-white min-h-screen flex flex-col">
      <div className="container mx-auto px-4 md:px-8 py-24 flex-1">
        <SectionHeader
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="max-w-2xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href={mailtoUrl}
              className="group p-6 border border-neutral-800 hover:border-brand/40 transition-colors"
            >
              <div className="w-10 h-10 flex items-center justify-center border border-brand/30 text-brand-foreground/80 mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-semibold mb-1">{t("channels.email.title")}</h3>
              <p className="text-brand-foreground/80 text-sm break-all" dir="ltr">
                {contactDetails.email}
              </p>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 border border-neutral-800 hover:border-brand/40 transition-colors"
            >
              <div className="w-10 h-10 flex items-center justify-center border border-brand/30 text-brand-foreground/80 mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-semibold mb-1">{t("channels.whatsapp.title")}</h3>
              <p className="text-brand-foreground/80 text-sm" dir="ltr">
                {contactDetails.phoneDisplay}
              </p>
              <p className="text-neutral-500 text-xs mt-1 flex items-center gap-1">
                <ExternalLink size={11} />
                {t("channels.whatsapp.hint")}
              </p>
            </a>

            <a
              href={telUrl}
              className="group p-6 border border-neutral-800 hover:border-brand/40 transition-colors"
            >
              <div className="w-10 h-10 flex items-center justify-center border border-brand/30 text-brand-foreground/80 mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-semibold mb-1">{t("channels.phone.title")}</h3>
              <p className="text-brand-foreground/80 text-sm" dir="ltr">
                {contactDetails.phoneDisplay}
              </p>
            </a>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">{t("locationTitle")}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <p className="text-neutral-400 flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 shrink-0 text-brand-foreground/70" />
                <span>
                  <span className="text-white font-semibold block">
                    {tInfo("address")}
                  </span>
                  {contactDetails.location}
                </span>
              </p>
              <p className="text-neutral-400 flex items-start gap-2">
                <Clock className="w-4 h-4 mt-1 shrink-0 text-brand-foreground/70" />
                <span>
                  <span className="text-white font-semibold block">
                    {t("hoursLabel")}
                  </span>
                  {contactDetails.hours}
                </span>
              </p>
            </div>
            <p className="text-neutral-400">
              <span className="text-white font-semibold">{t("coverageLabel")}</span>{" "}
              {t("coverage")}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">{t("routingTitle")}</h2>
            <p className="text-neutral-400 leading-relaxed">
              {t("routingLead")}{" "}
              <a
                href={mailtoUrl}
                className="text-white hover:text-brand-foreground transition-colors break-all"
                dir="ltr"
              >
                {contactDetails.email}
              </a>
              . {t("routingAnd")}{" "}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-brand-foreground transition-colors"
                dir="ltr"
              >
                {contactDetails.phoneDisplay}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      <Footer />
      <FloatingCursor />
    </main>
  );
}
