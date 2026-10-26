"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { footerLinks } from "../constants";

export function FooterNav() {
  const t = useTranslations("navigation");

  return (
    <ul className="space-y-3">
      {footerLinks.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-sm text-neutral-400 transition-colors hover:text-white"
          >
            {t(link.key)}
          </Link>
        </li>
      ))}
    </ul>
  );
}
