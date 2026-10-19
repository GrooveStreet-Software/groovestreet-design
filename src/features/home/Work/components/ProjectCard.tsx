"use client";

import { motion } from "motion/react";
import type { ProjectItem } from "../types";

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  title: string;
  subtitle: string;
}

export function ProjectCard({ project, index, title, subtitle }: ProjectCardProps) {
  return (
    <motion.a
      href={`/samples/${project.key}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="group block border border-neutral-800 hover:border-brand/40 transition-colors duration-300 overflow-hidden"
    >
      <div className="aspect-[4/3] bg-neutral-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl font-bold text-brand-foreground/30">{String(index + 1).padStart(2, "0")}</span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold mb-1 group-hover:text-brand-foreground/80 transition-colors">{title}</h3>
        <p className="text-neutral-400 text-sm">{subtitle}</p>
      </div>
    </motion.a>
  );
}
