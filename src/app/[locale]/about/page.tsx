import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui";
import { FloatingCursor } from "@/components";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  return {
    title: "About Us — GROOVESTREET",
    description: "Learn about GROOVESTREET, a software design agency powered by AI.",
  };
}

export default function AboutPage() {
  const t = useTranslations("about");

  return (
    <main className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 md:px-8 py-24">
        <SectionHeader
          label="About Us"
          title="The Studio"
          subtitle="One Human + One AI"
        />

        <div className="max-w-3xl mx-auto space-y-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Who We Are</h2>
            <p className="text-neutral-400 leading-relaxed">
              GROOVESTREET is a software design agency based in Kampala, Uganda. We design and build
              premium websites and digital tools for growing businesses across East Africa and beyond.
            </p>
            <p className="text-neutral-400 leading-relaxed">
              We are one human and one AI — combining human vision with machine speed. This means
              faster delivery, lower costs, and a level of polish that would be impossible with a
              traditional agency structure.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">What We Do</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2"></span>
                <div>
                  <h3 className="font-semibold">Website Design & Build</h3>
                  <p className="text-neutral-400 text-sm">
                    Custom websites that bring you calls and messages. From UGX 500,000.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2"></span>
                <div>
                  <h3 className="font-semibold">Landing Pages</h3>
                  <p className="text-neutral-400 text-sm">
                    One page, one offer, one clear next step. From UGX 200,000 in 3–5 days.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2"></span>
                <div>
                  <h3 className="font-semibold">Graphic Design</h3>
                  <p className="text-neutral-400 text-sm">
                    Flyers, posters, social media graphics. UGX 20,000 per design, 48h turnaround.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand mt-2"></span>
                <div>
                  <h3 className="font-semibold">SEO & Care Plans</h3>
                  <p className="text-neutral-400 text-sm">
                    Get found on Google. Monthly care from UGX 50,000/mo. Cancel anytime.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">How We Work</h2>
            <p className="text-neutral-400 leading-relaxed">
              Our process is simple: Discovery, Quote, Design, Build, Launch. You tell us about
              your business, we give you a fixed UGX quote with a written timeline, then we design,
              build, and test on real devices before launch.
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Contact</h2>
            <div className="space-y-3">
              <p className="text-neutral-400">
                <span className="text-white font-semibold">Email:</span>{" "}
                <a href="mailto:groovestreetsoftware@gmail.com" className="text-brand-foreground/80 hover:text-brand-foreground">
                  groovestreetsoftware@gmail.com
                </a>
              </p>
              <p className="text-neutral-400">
                <span className="text-white font-semibold">Phone / WhatsApp:</span>{" "}
                <a href="tel:+256774778164" className="text-brand-foreground/80 hover:text-brand-foreground">
                  +256 774 778 164
                </a>
              </p>
              <p className="text-neutral-400">
                <span className="text-white font-semibold">Location:</span> Kampala, Uganda
              </p>
              <p className="text-neutral-400">
                <span className="text-white font-semibold">Hours:</span> Mon–Fri, 9:00–18:00 (EAT)
              </p>
            </div>
          </div>
        </div>
      </div>
      <FloatingCursor />
    </main>
  );
}
