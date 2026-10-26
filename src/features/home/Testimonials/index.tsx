"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeader, Card } from "@/components/ui";
import { Reveal } from "@/components";
import { testimonialItems } from "./constants";
import { StarRating } from "./components";

const SLIDE_MS = 7000;

export function Testimonials() {
  const t = useTranslations("testimonials");
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = testimonialItems.length;
  const activeKey = testimonialItems[activeIndex].key;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + total) % total);
    },
    [total]
  );

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(next, SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [activeIndex, paused, next]);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto relative z-10">
        <Reveal>
          <SectionHeader
            label={t("label")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>

        <div className="md:hidden">
          <Reveal delay={100}>
            <div className="max-w-4xl mx-auto">
            <Card
              className="relative overflow-hidden p-8 md:p-12"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocusCapture={() => setPaused(true)}
              onBlurCapture={() => setPaused(false)}
            >
              <div className="absolute top-6 end-8 text-white/10 opacity-60">
                <Quote size={120} />
              </div>

              <div
                className="relative z-10 min-h-[230px]"
                aria-live="polite"
                aria-atomic="true"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={activeKey}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Review
                      reviewKey={activeKey}
                      quoteClassName="mb-8 text-xl font-light leading-relaxed text-white md:text-3xl"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="relative z-10 mt-8 flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                <span className="text-xs uppercase tracking-widest text-white/50 tabular-nums">
                  {t("position", { current: activeIndex + 1, total })}
                </span>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label={t("previous")}
                    className="flex h-10 w-10 items-center justify-center border border-white/20 text-white/70 transition-colors hover:border-brand hover:bg-brand hover:text-white"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label={t("next")}
                    className="flex h-10 w-10 items-center justify-center border border-white/20 text-white/70 transition-colors hover:border-brand hover:bg-brand hover:text-white"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="relative z-10 mt-4 h-px w-full overflow-hidden bg-white/10">
                <div
                  key={activeIndex}
                  className="gs-testimonial-progress h-full bg-brand"
                  style={{ animationPlayState: paused ? "paused" : "running" }}
                />
              </div>
            </Card>
          </div>
        </Reveal>
        </div>

        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialItems.map((item, index) => (
            <Reveal key={item.key} delay={index * 70} as="article">
              <Card className="flex h-full flex-col p-6 lg:p-8">
                <Review
                  reviewKey={item.key}
                  quoteClassName="mb-6 flex-1 text-lg font-light leading-relaxed text-white"
                />
              </Card>
            </Reveal>
          ))}
        </div>

        <div className="pointer-events-none absolute end-20 top-40 h-56 w-56 border border-white/5" />
        <div className="pointer-events-none absolute bottom-20 start-10 h-32 w-32 border-2 border-white/10" />
      </div>
    </section>
  );
}

function Review({
  reviewKey,
  quoteClassName,
}: {
  reviewKey: string;
  quoteClassName: string;
}) {
  const t = useTranslations("testimonials");

  return (
    <>
      <StarRating
        rating={Number(t(`reviews.${reviewKey}.rating`))}
        className="mb-6"
      />
      <blockquote className={quoteClassName}>
        &ldquo;{t(`reviews.${reviewKey}.quote`)}&rdquo;
      </blockquote>
      <div className="flex items-center">
        <div className="me-4 h-px w-12 bg-white/40" />
        <div>
          <div className="font-bold text-white">
            {t(`reviews.${reviewKey}.author`)}
          </div>
          <div className="text-sm text-white/60">
            {t(`reviews.${reviewKey}.role`)}
          </div>
        </div>
      </div>
    </>
  );
}
