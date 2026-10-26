import { setRequestLocale } from "next-intl/server";
import { Footer } from "@/layouts";
import {
  Hero,
  Features,
  LiveSample,
  Process,
  Pricing,
  Testimonials,
  Trust,
  Contact,
} from "@/features";
import { NoiseBackground } from "@/components";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="bg-black text-white min-h-screen">
      <NoiseBackground />
      <Hero />
      <Features />
      <LiveSample />
      <Process />
      <Pricing />
      <Testimonials />
      <Trust />
      <Contact />
      <Footer cta={{ title: "Let's build yours." }} />
    </main>
  );
}
