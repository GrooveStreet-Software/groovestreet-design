"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui";
import { useHeroMouseEffect } from "./hooks";
import {
  HeroHeadline,
  HeroButtons,
  HeroServiceSwitch,
  HeroShape,
  HeroScrollIndicator,
  HeroStats,
} from "./components";

export function Hero() {
  const t = useTranslations("hero");
  const { shapeRef } = useHeroMouseEffect();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.35]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100dvh] items-center overflow-hidden py-[100px] sm:py-[110px]"
    >
      <motion.div className="absolute inset-0 z-0" style={{ y: backgroundY }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a2a24_0%,_#000_100%)]"></div>
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container mx-auto relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <Badge variant="outline" className="border-brand/30 text-brand-foreground/90">
                {t("badge")}
              </Badge>
            </motion.div>

            <HeroHeadline />
            <HeroServiceSwitch />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-neutral-400 mb-8 max-w-md text-lg"
            >
              {t("description")}
            </motion.p>

            <HeroButtons />
          </div>

          <HeroShape ref={shapeRef} />
        </div>

        <HeroStats />
        <HeroScrollIndicator />
      </motion.div>
    </section>
  );
}
