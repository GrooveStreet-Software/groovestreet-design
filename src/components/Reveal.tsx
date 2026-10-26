"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useScrollReveal } from "@/hooks";

interface RevealProps {
  children: ReactNode;
  /** Stagger offset in ms, for siblings appearing in a row. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "figure";
}

/**
 * Scroll reveal that replays in both directions: enter viewport to animate in,
 * leave it to animate back out. Using `animate` (not `whileInView`) keeps the
 * reverse pass intact, which `viewport={{ once: true }}` would lock.
 */
export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const { ref, revealed } = useScrollReveal<HTMLDivElement>();
  const Tag = motion[as] as typeof motion.div;

  return (
    <Tag
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={
        revealed
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 24 }
      }
      transition={{ duration: 0.6, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </Tag>
  );
}
