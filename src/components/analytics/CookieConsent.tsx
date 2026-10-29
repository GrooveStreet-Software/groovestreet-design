"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const CONSENT_KEY = "gs-analytics-consent";

export function CookieConsent() {
  const t = useTranslations("cookieConsent");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!window.localStorage.getItem(CONSENT_KEY)) setVisible(true);
  }, []);

  const choose = (value: "granted" | "denied") => {
    window.localStorage.setItem(CONSENT_KEY, value);
    window.dispatchEvent(new Event("gs-consent-change"));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label={t("label")}
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-neutral-800 bg-black/95 px-4 py-4 backdrop-blur sm:px-6"
    >
      <div className="container mx-auto flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-xs leading-relaxed text-neutral-400">
          {t("body")}{" "}
          <Link
            href="/privacy"
            className="text-white underline underline-offset-4 hover:text-brand-foreground"
          >
            {t("learnMore")}
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="border border-neutral-700 px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white"
          >
            {t("decline")}
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="border border-brand bg-brand px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-white transition-colors hover:bg-brand-muted"
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
