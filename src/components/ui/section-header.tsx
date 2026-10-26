"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
  animate?: boolean;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  action,
  className,
  animate = true,
}: SectionHeaderProps) {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>();

  const content = (
    <>
      <div className="flex items-center gap-4 mb-6">
        <div className="h-px w-12 bg-white/40"></div>
        <div className="text-xs uppercase tracking-widest text-white/80">
          {label}
        </div>
      </div>
      <div
        className={cn(
          action && "flex flex-col md:flex-row md:items-end justify-between"
        )}
      >
        <h2
          className={cn(
            "text-4xl md:text-5xl font-bold tracking-tighter text-white",
            action && "mb-4 md:mb-0"
          )}
        >
          {title}
          {subtitle && (
            <>
              <br />
              <span className="text-white/70">{subtitle}</span>
            </>
          )}
        </h2>
        {action}
      </div>
    </>
  );

  if (!animate) {
    return <div className={cn("mb-16", className)}>{content}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className={cn("mb-16", className)}
    >
      {content}
    </motion.div>
  );
}
