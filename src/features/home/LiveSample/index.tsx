"use client";

import { useState } from "react";
import { ArrowRight, ExternalLink, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui";
import { Reveal } from "@/components";
import { Link } from "@/i18n/navigation";

/**
 * Live sample.
 *
 * The site we built renders here, in place, straight from Netlify — no modal and
 * no screenshot standing in for it. The visitor sees exactly what their
 * customers would see, with a clear path out to the full site.
 */
export function LiveSample() {
  const t = useTranslations("liveSample");
  const url = t("url");
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="samples" className="scroll-mt-24 py-24 relative overflow-hidden bg-[#0a0a0a]">
      <div className="container mx-auto relative z-10">
        <Reveal>
          <SectionHeader
            label={t("label")}
            title={t("title")}
            subtitle={t("subtitle")}
          />
        </Reveal>

        <Reveal delay={120} className="mt-12">
          <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl mb-6">
            {t("description")}
          </p>

          <div className="relative border border-neutral-800 hover:border-brand/50 transition-colors duration-300 overflow-hidden bg-neutral-950">
            {/* Browser chrome */}
            <div className="flex items-center gap-3 px-4 py-2.5 border-b border-neutral-800 bg-neutral-900">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              </div>
              <div className="flex-1 flex items-center gap-2 bg-black/60 px-3 py-1 text-xs text-neutral-400 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="truncate" dir="ltr">{url}</span>
              </div>
              <span className="hidden sm:inline-flex items-center gap-2 bg-black/60 border border-white/15 px-3 py-1 text-xs uppercase tracking-widest text-white/80">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                {t("liveBadge")}
              </span>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-white transition-colors p-1"
                aria-label={t("newTabHint")}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* The live site, rendered in place */}
            <div className="relative">
              {!loaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-neutral-950 text-neutral-400">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span className="text-xs uppercase tracking-widest">
                    Loading live site…
                  </span>
                </div>
              )}
              <iframe
                src={url}
                title="Hotel GrooveStreet — live site"
                onLoad={() => setLoaded(true)}
                loading="lazy"
                className="w-full h-[400px] sm:h-[480px] lg:h-[560px] border-0"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={220} className="mt-6 flex flex-wrap items-center gap-4">
          <Link
            href="/samples"
            className="inline-flex items-center gap-2 border border-white px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
          >
            {t("viewAll")}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
          </Link>
        </Reveal>
      </div>

      <div className="absolute top-20 end-20 w-40 h-40 border border-white/5"></div>
      <div className="absolute bottom-20 start-20 w-60 h-60 border border-white/5"></div>
    </section>
  );
}
