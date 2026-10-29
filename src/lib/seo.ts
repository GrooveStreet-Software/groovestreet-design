import type { Metadata } from "next";
import { openGraphLocales, routing } from "@/i18n";
import { SITE_URL } from "./siteUrl";

interface PageMetadataOptions {
  locale: string;
  path?: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
}

export function pageMetadata({
  locale,
  path = "",
  title,
  description,
  image = "/image.png",
  imageAlt,
}: PageMetadataOptions): Metadata {
  const url = `${SITE_URL}/${locale}${path}`;
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  const languages = Object.fromEntries(
    routing.locales.map((code) => [code, `${SITE_URL}/${code}${path}`])
  );

  languages["x-default"] = `${SITE_URL}/${routing.defaultLocale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "GROOVESTREET",
      locale:
        openGraphLocales[locale as keyof typeof openGraphLocales] ??
        openGraphLocales[routing.defaultLocale],
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt ?? title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
