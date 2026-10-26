"use client";

import { useTranslations } from "next-intl";
import {
  ArrowUpRight,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Button, SectionHeader } from "@/components/ui";
import { GithubIcon } from "@/components/icons";
import { Reveal } from "@/components";
import { Footer } from "@/layouts";
import { useContactModal } from "@/providers";
import {
  contactDetails,
  githubUrl,
  mailtoUrl,
  telUrl,
  whatsappUrl,
} from "@/lib";

export function AboutContent() {
  const t = useTranslations("pages.about");
  const { open } = useContactModal();
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
    <main id="about" className="flex min-h-screen flex-col bg-black text-white">
      <div className="container mx-auto flex-1 px-4 py-24 md:px-8">
        <Reveal>
          <SectionHeader
            label={t("label")}
            title={t("heading")}
            subtitle={t("subtitle")}
          />
        </Reveal>

        <div className="mx-auto max-w-3xl space-y-12">
          <Reveal as="section">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">{t("whoTitle")}</h2>
              <p className="leading-relaxed text-neutral-400">{t("whoBody")}</p>
              <p className="leading-relaxed text-neutral-400">{t("whoBody2")}</p>
            </div>
          </Reveal>

          <Reveal as="section" delay={100}>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">{t("howTitle")}</h2>
              <p className="leading-relaxed text-neutral-400">{t("howBody")}</p>
            </div>
          </Reveal>
        </div>

        <div className="mt-24">
          <Reveal>
            <div className="mb-14 text-center">
              <div className="mb-6 flex items-center justify-center gap-4">
                <div className="h-px w-12 bg-white/40" />
                <div className="text-xs uppercase tracking-widest text-white/80">
                  {t("label")}
                </div>
              </div>
              <h2 className="text-4xl font-bold tracking-tighter text-white md:text-5xl">
                {t("teamTitle")}
              </h2>
              <p className="mt-3 text-white/70">{t("teamSubtitle")}</p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {keys.map((key, index) => {
              const member = members[key];

              return (
                <Reveal key={key} delay={index * 120} as="article">
                  <div className="group flex h-full flex-col overflow-hidden border border-neutral-800 transition-colors duration-300 hover:border-brand/40">
                    <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={member.image}
                        alt={member.name}
                        loading="lazy"
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="mb-1 text-xl font-bold">{member.name}</h3>
                      <p className="mb-4 text-xs uppercase tracking-widest text-brand-foreground/70">
                        {member.role}
                      </p>
                      <p className="mb-4 text-sm leading-relaxed text-neutral-400">
                        {member.description}
                      </p>

                      <div className="mt-auto border-t border-neutral-800 pt-4">
                        <p className="mb-2 text-xs uppercase tracking-widest text-white/60">
                          {t("motivationLabel")}
                        </p>
                        <p className="mb-4 text-sm leading-relaxed text-neutral-400">
                          {member.motivation}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          <a
                            href={member.portfolioUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 border border-neutral-700 px-3 py-1.5 text-xs uppercase tracking-widest text-neutral-300 transition-colors hover:border-brand hover:text-white"
                          >
                            <ExternalLink className="h-3 w-3" />
                            {member.links.portfolio}
                          </a>
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 border border-neutral-700 px-3 py-1.5 text-xs uppercase tracking-widest text-neutral-300 transition-colors hover:border-brand hover:text-white"
                          >
                            <Phone className="h-3 w-3" />
                            {member.links.whatsapp}
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

        <div id="contact" className="mx-auto mt-24 max-w-2xl scroll-mt-24">
          <Reveal>
            <SectionHeader
              label={t("contactLabel")}
              title={t("contactTitle")}
              subtitle={t("contactSubtitle")}
            />
          </Reveal>

          <Reveal as="section" className="mt-10 space-y-6">
            <p className="leading-relaxed text-neutral-400">
              {t("contactLead")}
            </p>

            <div className="space-y-4">
              <p className="flex items-start gap-2 text-neutral-400">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-brand-foreground/70" />
                <a
                  href={mailtoUrl}
                  className="break-all transition-colors hover:text-white"
                  dir="ltr"
                >
                  {contactDetails.email}
                </a>
              </p>
              <p className="flex items-start gap-2 text-neutral-400">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-brand-foreground/70" />
                <a
                  href={telUrl}
                  className="transition-colors hover:text-white"
                  dir="ltr"
                >
                  {contactDetails.phoneDisplay}
                </a>
              </p>
              <p className="flex items-start gap-2 text-neutral-400">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-brand-foreground/70" />
                {contactDetails.location}
              </p>
              <p className="flex items-start gap-2 text-neutral-400">
                <GithubIcon className="mt-1 h-4 w-4 shrink-0 text-brand-foreground/70" />
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all transition-colors hover:text-white"
                  dir="ltr"
                >
                  github.com/GrooveStreet-Software
                </a>
              </p>
            </div>

            <Button
              onClick={open}
              aria-haspopup="dialog"
              className="px-6 py-3"
            >
              {t("contactCta")}
              <ArrowUpRight className="ms-2 h-4 w-4" />
            </Button>
          </Reveal>
        </div>
      </div>

      <Footer />
    </main>
  );
}
