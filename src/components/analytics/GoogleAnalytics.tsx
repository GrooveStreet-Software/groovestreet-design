"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { usePathname } from "@/i18n/navigation";

type ConsentValue = "granted" | "denied" | null;
type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
};

const CONSENT_KEY = "gs-analytics-consent";
const FALLBACK_MEASUREMENT_ID = "G-KJLSPYLX5Z";
const MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
  (process.env.NODE_ENV === "production" ? FALLBACK_MEASUREMENT_ID : undefined);

function readConsent(): ConsentValue {
  if (typeof window === "undefined") return null;

  const value = window.localStorage.getItem(CONSENT_KEY);
  if (value === "granted" || value === "denied") return value;

  return null;
}

export function GoogleAnalytics() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<ConsentValue>(null);

  useEffect(() => {
    setConsent(readConsent());

    const onChange = () => setConsent(readConsent());
    window.addEventListener("gs-consent-change", onChange);

    return () => window.removeEventListener("gs-consent-change", onChange);
  }, []);

  useEffect(() => {
    if (!MEASUREMENT_ID || consent !== "granted") return;

    const analyticsWindow = window as AnalyticsWindow;
    analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
    analyticsWindow.gtag =
      analyticsWindow.gtag ||
      ((...args: unknown[]) => {
        analyticsWindow.dataLayer?.push(args);
      });

    analyticsWindow.gtag("event", "page_view", {
      page_location: window.location.href,
      page_path: `${window.location.pathname}${window.location.search}`,
      page_title: document.title,
    });
  }, [pathname, consent]);

  if (!MEASUREMENT_ID || consent !== "granted") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${MEASUREMENT_ID}',{send_page_view:false});`}
      </Script>
    </>
  );
}
