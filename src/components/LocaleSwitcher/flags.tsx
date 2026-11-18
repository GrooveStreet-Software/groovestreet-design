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

/** Kiswahili / Kenya. Horizontal bands of black, red and green with the
 * Kenyan coat-of-arms (a white shield, a red star and two crossed spears). */
export const FlagSw = () => (
  <svg viewBox="0 0 60 30" className="w-5 h-[11px] rounded-[1px]" aria-hidden="true">
    <rect width="60" height="10" fill="#000000" />
    <rect y="10" width="60" height="10" fill="#FF0000" />
    <rect y="20" width="60" height="10" fill="#006400" />

    {/* Central shield */}
    <path
      d="M 11,4 H 29 V 6 H 24 C 18,6 15,9 15,13 L 15,18 C 15,20 17,22 17,24 L 17,25 H 29 C 31,25 33,24 33,22 L 33,10 C 33,7 31,4 29,4 Z"
      fill="#ffffff"
    />
    <rect x="11" y="8" width="9" height="16" fill="#000000" />
    <rect x="20" y="8" width="10" height="16" fill="#ffffff" />
    <rect x="20" y="8" width="10" height="7" fill="#006400" />

    {/* Red star above the shield */}
    <path
      d="M 25,2 L 26,5 L 29,6 L 27,9 L 28,13 L 25,11 L 22,13 L 23,9 L 20,6 L 23,5 Z"
      fill="#FF0000"
    />

    {/* Green spear */}
    <path d="M -2,10 L -2,18 C 0,20 5,20 5,14" fill="#006400" />
    <rect x="5" y="6" width="4" height="8" fill="#000000" />
    <path d="M 5,6 L 9,10 L 7,10 L 9,14 L 3,6 Z" fill="#000000" />

    {/* Black spearhead */}
    <rect x="11" y="3" width="4" height="5" fill="#ffffff" />
    <path d="M 11,3 L 15,7 L 13,7 L 15,11 L 9,3 Z" fill="#000000" />
  </svg>
);

export const localeFlags: Record<LocaleCode, () => ReactElement> = {
  en: FlagGb,
  fr: FlagFr,
  de: FlagDe,
  sw: FlagSw,
};

/** Short label shown in the switcher, e.g. "EN". */
export const localeShort: Record<LocaleCode, string> = {
  en: "EN",
  fr: "FR",
  de: "DE",
  sw: "SW",
};

export const localeList: LocaleCode[] = [...routing.locales];

export const getFlag = (code: string) =>
  localeFlags[code as LocaleCode] ?? FlagGb;

export const getShort = (code: string) =>
  localeShort[code as LocaleCode] ?? code.toUpperCase();
