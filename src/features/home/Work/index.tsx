"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui";
import { projectItems } from "./constants";
import { ProjectCard } from "./components";

export function Work() {
  const t = useTranslations("work");

  return (
    <section
      id="samples"
      className="py-24 relative overflow-hidden bg-[#0a0a0a]"
    >
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <SectionHeader
          label={t("label")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projectItems.map((project, index) => (
            <ProjectCard
              key={project.key}
              project={project}
              index={index}
              title={t(`projects.${project.key}.title`)}
              subtitle={t(`projects.${project.key}.subtitle`)}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/samples"
            className="inline-flex items-center gap-2 text-brand-foreground/80 hover:text-brand-foreground transition-colors text-sm uppercase tracking-widest"
          >
            {t("viewAll")}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 end-20 w-40 h-40 border border-white/5"></div>
      <div className="absolute bottom-20 start-20 w-60 h-60 border border-white/5"></div>
    </section>
  );
}
