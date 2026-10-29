"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { ContactMarquee, Logo } from "@/components";
import { UgandaFlag } from "@/components/icons";
import { contactDetails, mailtoUrl, telUrl } from "@/lib";
import { trackEvent } from "@/lib/analytics";
import { useContactModal } from "@/providers";
import { Copyright, FooterNav, LegalLinks, SocialLinks } from "./components";

interface FooterProps {
  /**
   * Per-page call to action. Every page gets one, in the same shape and the
   * same direction — only the title changes, so the footer always ends on the
   * next logical step rather than a dead end.
   */
  cta?: { title: string };
}

export function Footer({ cta }: FooterProps) {
  const t = useTranslations("footer");
  const tContact = useTranslations("contact.info");
  const { open } = useContactModal();

  return (
    <footer className="border-t border-neutral-800">
      <ContactMarquee />
      <div className="container mx-auto pb-8 pt-16">
        {/* CTA band — the last push before the page ends */}
        <div className="mb-14 flex flex-col gap-6 border border-neutral-800 bg-white/[0.03] px-8 py-10 md:flex-row md:items-center md:justify-between md:px-12">
          <h2 className="max-w-xl text-2xl font-bold text-white md:text-3xl">
            {cta?.title ?? t("ctaTitle")}
          </h2>
          <button
            type="button"
            onClick={open}
            aria-haspopup="dialog"
            className="inline-flex shrink-0 items-center justify-center gap-2 bg-white px-7 py-3.5 text-xs font-semibold uppercase tracking-widest text-black transition-colors hover:bg-brand hover:text-white"
          >
            {t("ctaButton")}
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-400">
              {t("description")}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-xs uppercase tracking-widest text-white/60">
              {t("explore")}
            </h3>
            <FooterNav />
          </div>

          <div>
            <h3 className="mb-4 text-xs uppercase tracking-widest text-white/60">
              {t("contact")}
            </h3>
            <ul className="space-y-4 text-sm">
              <li>
                <span className="mb-1 block text-[10px] uppercase tracking-widest text-white/40">
                  {tContact("email")}
                </span>
                <a
                  href={mailtoUrl}
                  onClick={() =>
                    trackEvent("email_click", { location: "footer" })
                  }
                  className="break-all text-neutral-300 transition-colors hover:text-white"
                >
                  {contactDetails.email}
                </a>
              </li>
              <li>
                <span className="mb-1 block text-[10px] uppercase tracking-widest text-white/40">
                  {t("phoneWhatsApp")}
                </span>
                <a
                  href={telUrl}
                  dir="ltr"
                  onClick={() =>
                    trackEvent("phone_click", { location: "footer" })
                  }
                  className="text-neutral-300 transition-colors hover:text-white"
                >
                  {contactDetails.phoneDisplay}
                </a>
              </li>
            </ul>
            <div className="mt-5">
              <SocialLinks />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-800 pt-8 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:flex-row md:gap-5">
            <Copyright />
            <span className="hidden h-3 w-px bg-neutral-800 md:block" />
            <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-500">
              <UgandaFlag className="h-3 w-[18px] shrink-0" />
              {t("builtBy")}
            </p>
          </div>
          <LegalLinks />
        </div>
      </div>
    </footer>
  );
}
