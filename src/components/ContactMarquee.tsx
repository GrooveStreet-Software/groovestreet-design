"use client";

import { useTranslations } from "next-intl";
import { useContactModal } from "@/providers";
import { Marquee } from "./Marquee";

export function ContactMarquee() {
  const t = useTranslations("contactMarquee");
  const { open } = useContactModal();
  const items = t.raw("items") as string[];

  return (
    <button
      type="button"
      onClick={open}
      aria-label={t("aria")}
      aria-haspopup="dialog"
      className="group block w-full border-b border-neutral-800 bg-[#050505] py-4 text-left transition-colors hover:bg-[#080808]"
    >
      <Marquee duration={38}>
        {items.map((item) => (
          <span key={item} className="flex items-center">
            <span className="mx-6 whitespace-nowrap text-[11px] uppercase tracking-[0.28em] text-white/50 transition-colors group-hover:text-white/80 md:mx-8 md:text-xs">
              {item}
            </span>
            <span
              className="h-1.5 w-1.5 shrink-0 rotate-45 bg-brand"
              aria-hidden="true"
            />
          </span>
        ))}
      </Marquee>
    </button>
  );
}
