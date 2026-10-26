/**
 * Page-edge marquees.
 *
 * Two vertical rails frame every page with the studio's one-line promise. They
 * are fixed to the content column (not the viewport) so they line up with the
 * page on wide screens, sit below the navbar and bottom bar in the stack, and
 * never intercept a click. The text is duplicated inside each track so the
 * loop has no seam.
 */
const WORDS = ["GROOVESTREET", "DESIGN", "BUILD", "SHIP"] as const;

function Rail({
  direction,
  side,
}: {
  direction: "up" | "down";
  side: "left" | "right";
}) {
  const sequence = Array.from({ length: 4 }).flatMap(() => WORDS);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 ${side === "left" ? "left-0" : "right-0"} w-[16px] overflow-hidden border-x border-white/[0.06] bg-black/30 md:w-[34px]`}
    >
      <div
        className={`marquee-y-track flex flex-col ${
          direction === "down" ? "marquee-y-track--reverse" : ""
        }`}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex flex-col items-center">
            {sequence.map((word, index) => (
              <span
                key={`${copy}-${index}`}
                className={`whitespace-nowrap py-5 text-[7px] font-semibold uppercase tracking-[0.34em] [writing-mode:vertical-rl] md:py-6 md:text-[9px] ${
                  word === "GROOVESTREET" ? "text-white/55" : "text-white/25"
                }`}
              >
                {word}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function PageMarquees() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 mx-auto max-w-[1280px]"
    >
      <Rail direction="up" side="left" />
      <Rail direction="down" side="right" />
    </div>
  );
}
