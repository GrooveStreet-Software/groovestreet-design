"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { trackEvent } from "@/lib/analytics";
import { ContactForm, ContactInfo } from "@/features/home/Contact/components";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const t = useTranslations("contact");
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) trackEvent("contact_modal_open");
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.documentElement.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="presentation"
          className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-black/80 px-3 py-4 backdrop-blur-sm sm:items-center sm:px-12 sm:py-10 lg:px-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex max-h-[90dvh] w-[86vw] max-w-4xl flex-col overflow-hidden border border-neutral-800 bg-[#080808] shadow-2xl sm:max-h-[85vh] sm:w-full"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex shrink-0 items-start justify-between gap-4 border-b border-neutral-800 px-4 py-4 sm:gap-6 sm:px-6 sm:py-5 md:px-8">
              <div>
                <p className="mb-1 text-[10px] uppercase tracking-[0.35em] text-brand-foreground/70">
                  {t("label")}
                </p>
                <h2
                  id="contact-modal-title"
                  className="text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl"
                >
                  {t("title")}{" "}
                  <span className="text-neutral-500">{t("subtitle")}</span>
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label={t("modal.close")}
                className="flex h-9 w-9 shrink-0 items-center justify-center border border-neutral-800 text-neutral-400 transition-colors hover:border-brand hover:text-white sm:h-10 sm:w-10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid min-h-0 flex-1 gap-6 overflow-y-auto overscroll-contain px-4 py-5 sm:gap-8 sm:px-6 sm:py-6 md:grid-cols-2 md:px-8 md:py-8">
              <div>
                <p className="mb-5 text-sm leading-relaxed text-neutral-400">
                  {t("modal.note")}
                </p>
                <ContactForm idPrefix="modal-contact" />
              </div>
              <div className="hidden md:block">
                <ContactInfo />
              </div>
            </div>

            <div className="shrink-0 border-t border-neutral-800 px-4 py-3 text-xs leading-relaxed text-neutral-500 sm:px-6 sm:py-4 md:px-8">
              {t("modal.human")}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
