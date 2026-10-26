"use client";

import {
  cloneElement,
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactElement,
} from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  /**
   * Renders the button as the given element instead of a <button>.
   * Use for CTAs that must navigate — a control that only looks clickable
   * but has no destination is worse than no control at all.
   */
  render?: ReactElement<ButtonHTMLAttributes<HTMLElement>>;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, render, ...props },
    ref
  ) => {
    const baseStyles =
      "uppercase tracking-widest transition-all duration-300 flex items-center justify-center";

    const variants = {
      primary: "bg-white text-black hover:bg-white/90",
      secondary:
        "border border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white",
      outline: "border border-white hover:bg-white hover:text-black",
      ghost: "text-neutral-400 hover:text-white hover:bg-white/5",
    };

    const sizes = {
      sm: "px-4 py-2 text-xs",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-sm",
    };

    const classes = cn(baseStyles, variants[variant], sizes[size], className);

    if (render) {
      return cloneElement(render, {
        className: cn(classes, render.props.className),
        children,
        ...props,
      });
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
