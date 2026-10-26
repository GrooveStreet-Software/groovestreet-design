import type { ReactElement } from "react";
import { routing } from "@/i18n/routing";

export type LocaleCode = (typeof routing.locales)[number];

/**
 * Inline SVG flags. Emoji flags are not an option here: Windows renders them as
 * the ISO letter pair ("GB") rather than a flag, which looks broken.
 */

export const FlagGb = () => (
  <svg viewBox="0 0 60 30" className="w-5 h-[11px] rounded-[1px]" aria-hidden="true">
    <clipPath id="gb-s"><path d="M0,0 v30 h60 v-30 z" /></clipPath>
    <clipPath id="gb-t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" /></clipPath>
    <g clipPath="url(#gb-s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#gb-t)" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
    </g>
  </svg>
);

export const FlagFr = () => (
  <svg viewBox="0 0 60 30" className="w-5 h-[11px] rounded-[1px]" aria-hidden="true">
    <rect width="20" height="30" x="0" fill="#002654" />
    <rect width="20" height="30" x="20" fill="#ffffff" />
    <rect width="20" height="30" x="40" fill="#ce1126" />
  </svg>
);

export const FlagDe = () => (
  <svg viewBox="0 0 60 30" className="w-5 h-[11px] rounded-[1px]" aria-hidden="true">
    <rect width="60" height="10" y="0" fill="#000000" />
    <rect width="60" height="10" y="10" fill="#dd0000" />
    <rect width="60" height="10" y="20" fill="#ffce00" />
  </svg>
);

export const localeFlags: Record<LocaleCode, () => ReactElement> = {
  en: FlagGb,
  fr: FlagFr,
  de: FlagDe,
};

/** Short label shown in the switcher, e.g. "EN". */
export const localeShort: Record<LocaleCode, string> = {
  en: "EN",
  fr: "FR",
  de: "DE",
};

export const localeList: LocaleCode[] = [...routing.locales];

export const getFlag = (code: string) =>
  localeFlags[code as LocaleCode] ?? FlagGb;

export const getShort = (code: string) =>
  localeShort[code as LocaleCode] ?? code.toUpperCase();
