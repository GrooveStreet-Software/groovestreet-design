"use client";

interface MarqueeProps {
  children: React.ReactNode;
  /** Seconds for one full loop. */
  duration?: number;
  /** Move the track in the opposite direction. */
  reverse?: boolean;
  className?: string;
}

/**
 * Infinite horizontal marquee.
 *
 * The items are rendered twice and the track translates by -50%, so the loop
 * has no visible seam. The whole track is decorative — pass `aria-hidden` on
 * anything inside that should not be announced twice.
 */
export function Marquee({
  children,
  duration = 40,
  reverse = false,
  className = "",
}: MarqueeProps) {
  return (
    <div className={`marquee marquee-mask relative overflow-hidden ${className}`}>
      <div
        className={`marquee-track flex w-max items-center ${reverse ? "marquee-track--reverse" : ""}`}
        style={{ animationDuration: `${duration}s` }}
      >
        <div className="flex items-center">{children}</div>
        <div className="flex items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
