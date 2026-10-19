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
    title: "Contact Us — GROOVESTREET",
    description: "Get in touch with GROOVESTREET. Call, email, or WhatsApp.",
  };
}

export default function ContactPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 md:px-8 py-24">
        <SectionHeader
          label="Contact"
          title="Get In Touch"
          subtitle="We reply within 24 hours"
        />

        <div className="max-w-2xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a
              href="mailto:groovestreetsoftware@gmail.com"
              className="group p-6 border border-neutral-800 hover:border-brand/40 transition-colors"
            >
              <div className="w-10 h-10 flex items-center justify-center border border-brand/30 text-brand-foreground/80 mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-brand-foreground/80 text-sm">groovestreetsoftware@gmail.com</p>
            </a>

            <a
              href="https://wa.me/256774778164"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 border border-neutral-800 hover:border-brand/40 transition-colors"
            >
              <div className="w-10 h-10 flex items-center justify-center border border-brand/30 text-brand-foreground/80 mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">WhatsApp</h3>
              <p className="text-brand-foreground/80 text-sm">+256 774 778 164</p>
            </a>

            <a
              href="tel:+256774778164"
              className="group p-6 border border-neutral-800 hover:border-brand/40 transition-colors"
            >
              <div className="w-10 h-10 flex items-center justify-center border border-brand/30 text-brand-foreground/80 mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-1">Phone</h3>
              <p className="text-brand-foreground/80 text-sm">+256 774 778 164</p>
            </a>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Location & Hours</h2>
            <p className="text-neutral-400">
              <span className="text-white font-semibold">Location:</span> Kampala, Uganda
            </p>
            <p className="text-neutral-400">
              <span className="text-white font-semibold">Hours:</span> Mon–Fri, 9:00–18:00 (EAT)
            </p>
            <p className="text-neutral-400">
              <span className="text-white font-semibold">Coverage:</span> Based in Kampala, serving East Africa and worldwide
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Where do messages go?</h2>
            <p className="text-neutral-400 leading-relaxed">
              Contact form messages are sent to <span className="text-white">groovestreetsoftware@gmail.com</span>.
              You can also reach us directly via WhatsApp or phone at <span className="text-white">+256 774 778 164</span>.
            </p>
          </div>
        </div>
      </div>
      <FloatingCursor />
    </main>
  );
}
