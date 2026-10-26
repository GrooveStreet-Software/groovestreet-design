"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { getFlag, getShort, localeList } from "./flags";

/**
 * Language dropdown: flag + shorthand for the current language, full names in
 * the menu. Closes on outside click, Escape, or after a selection.
 */
export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("localeSwitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  const CurrentFlag = getFlag(locale);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const select = (next: string) => {
    setOpen(false);
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        disabled={isPending}
        className="flex items-center gap-2 px-3 py-2 border border-neutral-700 hover:border-white hover:bg-white hover:text-black text-neutral-300 transition-colors text-xs uppercase tracking-widest"
      >
        <CurrentFlag />
        <span>{getShort(locale)}</span>
        <ChevronDown
          className={cn("w-3.5 h-3.5 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t("switchTo", { language: t(`names.${locale}`) })}
          className="absolute end-0 top-full mt-2 z-50 min-w-[180px] bg-neutral-950 border border-neutral-800 py-1 shadow-xl"
        >
          {localeList.map((code) => {
            const Flag = getFlag(code);
            const active = code === locale;
            return (
              <li key={code} role="option" aria-selected={active}>
                <button
                  type="button"
                  onClick={() => select(code)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-start",
                    active
                      ? "text-white bg-white/10"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  )}
                >
                  <Flag />
                  <span className="flex-1">{t(`names.${code}`)}</span>
                  <span className="text-xs uppercase tracking-widest opacity-60">
                    {getShort(code)}
                  </span>
                  {active && <Check className="w-3.5 h-3.5" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
