import type { Metadata } from "next";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/ui";
import { FloatingCursor } from "@/components";

const samples = [
  {
    key: "hotel-groovestreet",
    title: "Hotel GrooveStreet",
    subtitle: "Luxury Hotel",
    description: "Luxury boutique hotel landing page with dark & gold palette, Cormorant Garamond + Jost typography, hero slider, reservation bar, amenities grid, and room cards.",
    file: "/samples/hotel-groovestreet.html",
  },
  {
    key: "juicy-main",
    title: "Juicy",
    subtitle: "3D Product Showcase",
    description: "Premium juice brand single-page with 3D can carousel, animated water-wave background, floating fruits/ice cubes, and dynamic theming per flavor.",
    file: "/samples/juicy-main.html",
  },
  {
    key: "saaspro",
    title: "SAASPRO",
    subtitle: "SaaS Landing",
    description: "SaaS landing page with 11 sections: hero, social proof, features, how-it-works, testimonials, pricing, comparison table, integrations, FAQ, blog preview, CTA.",
    file: "/samples/saaspro.html",
  },
  {
    key: "tech-landing",
    title: "Tech Landing",
    subtitle: "SaaS/Tech Landing",
    description: "Dark-themed SaaS landing with 10 sections: hero, social proof, how-it-works, features, integrations, testimonials, blog preview, pricing, FAQ, CTA.",
    file: "/samples/tech-landing.html",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  return {
    title: "Samples — GROOVESTREET",
    description: "One-page template previews for GROOVESTREET projects.",
  };
}

export default function SamplesPage() {
  const t = useTranslations("samples");

  return (
    <main className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 md:px-8 py-24">
        <SectionHeader
          label="Template Previews"
          title="One-Page"
          subtitle="Samples"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {samples.map((sample, index) => (
            <a
              key={sample.key}
              href={sample.file}
              target="_blank"
              rel="noopener noreferrer"
              className="group block border border-neutral-800 hover:border-brand/40 transition-colors duration-300 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-[4/3] bg-neutral-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-bold text-brand-foreground/30">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold mb-1 group-hover:text-brand-foreground/80 transition-colors">
                  {sample.title}
                </h3>
                <p className="text-brand-foreground/60 text-xs uppercase tracking-widest mb-2">
                  {sample.subtitle}
                </p>
                <p className="text-neutral-400 text-sm">{sample.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
      <FloatingCursor />
    </main>
  );
}
