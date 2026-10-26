"use client";

import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { SectionHeader } from "@/components/ui";
import { FloatingCursor, Reveal } from "@/components";
import { Footer } from "@/layouts";
import { contactDetails, telUrl, mailtoUrl, whatsappUrl } from "@/lib";

export function AboutContent() {
  const t = useTranslations("pages.about");
  const members = t.raw("members") as Record<
    string,
    {
      name: string;
      role: string;
      image: string;
      description: string;
      motivation: string;
      links: Record<string, string>;
      portfolioUrl: string;
      email: string;
    }
  >;

  const keys = Object.keys(members);

  return (
    <main className="bg-black text-white min-h-screen flex flex-col">
      <div className="container mx-auto px-4 md:px-8 py-24 flex-1">
        <Reveal>
          <SectionHeader
            label={t("label")}
            title={t("heading")}
            subtitle={t("subtitle")}
          />
        </Reveal>

        <div className="max-w-3xl mx-auto space-y-12">
          <Reveal as="section">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">{t("whoTitle")}</h2>
              <p className="text-neutral-400 leading-relaxed">{t("whoBody")}</p>
              <p className="text-neutral-400 leading-relaxed">{t("whoBody2")}</p>
            </div>
          </Reveal>

          <Reveal as="section" delay={100}>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">{t("howTitle")}</h2>
              <p className="text-neutral-400 leading-relaxed">{t("howBody")}</p>
            </div>
          </Reveal>
        </div>

        {/* ---------------- Team ---------------- */}
        <div className="mt-24">
          <Reveal>
            <div className="text-center mb-14">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-px w-12 bg-white/40"></div>
                <div className="text-xs uppercase tracking-widest text-white/80">
                  {t("label")}
                </div>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
                {t("teamTitle")}
              </h2>
              <p className="text-white/70 mt-3">{t("teamSubtitle")}</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keys.map((key, index) => {
              const m = members[key];
              return (
                <Reveal key={key} delay={index * 120} as="article">
                  <div className="group border border-neutral-800 hover:border-brand/40 transition-colors duration-300 overflow-hidden h-full flex flex-col">
                    <div className="aspect-[4/5] bg-neutral-900 relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={m.image}
                        alt={m.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-xl font-bold mb-1">{m.name}</h3>
                      <p className="text-brand-foreground/70 text-xs uppercase tracking-widest mb-4">
                        {m.role}
                      </p>
                      <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                        {m.description}
                      </p>

                      <div className="mt-auto pt-4 border-t border-neutral-800">
                        <p className="text-xs uppercase tracking-widest text-white/60 mb-2">
                          {t("motivationLabel")}
                        </p>
                        <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                          {m.motivation}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          <a
                            href={m.portfolioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-neutral-300 hover:text-white border border-neutral-700 hover:border-brand px-3 py-1.5 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {m.links.portfolio}
                          </a>
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-neutral-300 hover:text-white border border-neutral-700 hover:border-brand px-3 py-1.5 transition-colors"
                          >
                            <Phone className="w-3 h-3" />
                            {m.links.whatsapp}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* ---------------- Contact ---------------- */}
        <div className="max-w-3xl mx-auto mt-24">
          <Reveal as="section">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">{t("contactTitle")}</h2>
              <p className="text-neutral-400 flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 shrink-0 text-brand-foreground/70" />
                <a
                  href={mailtoUrl}
                  className="hover:text-white transition-colors break-all"
                  dir="ltr"
                >
                  {contactDetails.email}
                </a>
              </p>
              <p className="text-neutral-400 flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 shrink-0 text-brand-foreground/70" />
                <a href={telUrl} className="hover:text-white transition-colors" dir="ltr">
                  {contactDetails.phoneDisplay}
                </a>
              </p>
              <p className="text-neutral-400 flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 shrink-0 text-brand-foreground/70" />
                {contactDetails.location}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
      <Footer />
      <FloatingCursor />
    </main>
  );
}
