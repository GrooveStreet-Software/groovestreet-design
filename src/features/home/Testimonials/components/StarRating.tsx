"use client";

import { Star } from "lucide-react";

/**
 * Rating design: five outlined (black) stars with a white fill for the score.
 * The outline uses `text-black` and the fill is white, so the shape reads as a
 * solid white star inside a black outline.
 */
export function StarRating({ rating = 5, className = "" }: { rating?: number; className?: string }) {
  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < rating;
        return (
          <span key={i} className="relative inline-flex">
            {/* Outline (black) */}
            <Star className="w-4 h-4 text-black fill-none" strokeWidth={1.5} />
            {/* Fill (white) clipped to the rating */}
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: filled ? "100%" : "0%" }}
              aria-hidden="true"
            >
              <Star className="w-4 h-4 text-white fill-white" strokeWidth={1.5} />
            </span>
          </span>
        );
      })}
    </div>
  );
}
