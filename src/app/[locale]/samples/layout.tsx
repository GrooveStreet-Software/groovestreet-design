import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "samples.metadata" });

  return pageMetadata({
    locale,
    path: "/samples",
    title: t("title"),
    description: t("description"),
  });
}

export default function SamplesLayout({ children }: { children: ReactNode }) {
  return children;
}
