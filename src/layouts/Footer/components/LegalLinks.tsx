"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import { legalLinks } from "../constants";

export function LegalLinks() {
  const t = useTranslations("footer.legal");
  const locale = useLocale();

  return (
    <div className="flex gap-6">
      {legalLinks.map((link) => (
        <Link
          key={link.href}
          href={`/${locale}${link.href}`}
          className="text-neutral-400 hover:text-white transition-colors text-sm"
        >
          {t(link.key)}
        </Link>
      ))}
    </div>
  );
}
