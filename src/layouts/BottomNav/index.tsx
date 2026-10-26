"use client";

import { Mail, Phone, MessageCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { mailtoUrl, telUrl, whatsappUrl } from "@/lib";

/**
 * Static bottom bar with the three ways to reach us. Always present, always
 * reachable — the primary conversion path on a services site.
 */
export function BottomNav() {
  const t = useTranslations("contact.info");

  const channels = [
    { href: mailtoUrl, label: t("email"), icon: Mail, external: false },
    { href: telUrl, label: t("phone"), icon: Phone, external: false },
    { href: whatsappUrl, label: t("whatsapp"), icon: MessageCircle, external: true },
  ];

  return (
    <nav
      aria-label="Quick contact"
      className="fixed bottom-0 inset-x-0 z-40 bg-black/90 backdrop-blur-md border-t border-neutral-800"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-3 divide-x divide-neutral-800">
          {channels.map(({ href, label, icon: Icon, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex items-center justify-center gap-2 py-3 text-xs uppercase tracking-widest text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
