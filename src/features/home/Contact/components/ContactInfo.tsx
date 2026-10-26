"use client";

import { Mail, Phone, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card } from "@/components/ui";
import { WhatsAppIcon } from "@/components/icons";
import { contactDetails } from "@/lib";
import { contactSocials } from "../constants";
import { ContactItem } from "./ContactItem";

export function ContactInfo() {
  const t = useTranslations("contact.info");
  const tContact = useTranslations("contact");
  const tSocial = useTranslations("contact.info");
  const whatsappIntroUrl = `https://wa.me/${contactDetails.whatsapp}?text=${encodeURIComponent(tContact("whatsappIntro"))}`;

  return (
    <Card className="h-full">
      <h3 className="text-2xl font-bold mb-6 text-white">{t("title")}</h3>

      <a
        href={whatsappIntroUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-6 inline-flex w-full items-center justify-center gap-2 border border-[#25D366]/40 bg-[#25D366]/10 px-4 py-3 text-xs font-semibold uppercase tracking-widest text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-black"
      >
        <WhatsAppIcon className="h-4 w-4" />
        {tContact("whatsappCta")}
      </a>
      <p className="mb-8 text-xs leading-relaxed text-white/50">
        {tContact("whatsappLead")}
      </p>

      <div className="space-y-8">
        <ContactItem
          icon={<Mail className="w-5 h-5 text-white" />}
          label={t("email")}
        >
          <a
            href={`mailto:${contactDetails.email}`}
            className="text-white hover:text-white/70 transition-colors"
          >
            {contactDetails.email}
          </a>
        </ContactItem>

        <ContactItem
          icon={<Phone className="w-5 h-5 text-white" />}
          label={t("phone")}
        >
          <a
            href={`tel:${contactDetails.phoneTel}`}
            dir="ltr"
            className="text-white hover:text-white/70 transition-colors"
          >
            {contactDetails.phoneDisplay}
          </a>
        </ContactItem>

        <ContactItem
          icon={<MapPin className="w-5 h-5 text-white" />}
          label={t("address")}
        >
          <address className="not-italic text-white/80">
            {t("street")}
            <br />
            {t("city")}
            <br />
            {t("country")}
          </address>
        </ContactItem>

        <div>
          <div className="text-sm uppercase tracking-widest text-white/70 mb-3">
            {t("social")}
          </div>
          <div className="flex gap-4">
            {contactSocials.map(({ key, href, icon: Icon }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-sm hover:bg-white/20 transition-colors group"
                aria-label={tSocial(key)}
              >
                <Icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
