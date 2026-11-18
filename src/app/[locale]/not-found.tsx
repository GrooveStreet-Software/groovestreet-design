"use client";

import { ArrowUpRight, MoveLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui";
import { Link } from "@/i18n/navigation";
import { Footer } from "@/layouts";

const quickLinks = [
  { href: "/", key: "home" },
  { href: "/samples", key: "samples" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export default function NotFound() {
  const t = useTranslations("notFound");

  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      <section className="relative flex flex-1 items-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,_#1a2a24_0%,_#000_70%)]" />

        <div className="container relative z-10 pb-24 pt-32 md:pb-32 md:pt-40">
          <div className="grid items-center gap-16 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-6 flex items-center gap-4">
                <div className="h-px w-12 bg-white/40" />
                <p className="text-xs uppercase tracking-widest text-white/80">
                  {t("label")}
                </p>
              </div>

              <h1 className="max-w-xl text-4xl font-bold tracking-tighter text-white md:text-6xl">
                {t("title")}
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-neutral-400">
                {t("description")}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="gap-2"
                  render={<Link href="/" />}
                >
                  <MoveLeft className="h-4 w-4" />
                  {t("home")}
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2"
                  render={<Link href="/samples" />}
                >
                  {t("samples")}
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>

              <nav aria-label={t("popularLabel")} className="mt-14 max-w-md">
                <p className="mb-3 text-[10px] uppercase tracking-widest text-white/40">
                  {t("popularLabel")}
                </p>
                <ul className="border-t border-neutral-800">
                  {quickLinks.map((link, index) => (
                    <li key={link.key} className="border-b border-neutral-800">
                      <Link
                        href={link.href}
                        className="group flex items-center justify-between py-4 text-sm text-neutral-400 transition-colors hover:text-white"
                      >
                        <span className="flex items-center gap-4">
                          <span className="text-[10px] tracking-widest text-white/30">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          {t(`links.${link.key}`)}
                        </span>
                        <ArrowUpRight className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div
              aria-hidden="true"
              className="relative flex min-h-[280px] items-center justify-center md:min-h-[440px]"
            >
              <div className="absolute h-64 w-64 rounded-full border border-brand/30 md:h-96 md:w-96" />
              <div className="absolute h-48 w-48 rounded-full border border-dashed border-white/10 md:h-72 md:w-72" />
              <span className="select-none text-[9rem] font-bold leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.28)] md:text-[14rem]">
                404
              </span>
              <span className="absolute bottom-4 border border-neutral-800 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-widest text-neutral-400 backdrop-blur-sm">
                {t("badge")}
              </span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
