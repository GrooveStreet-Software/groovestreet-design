import type { ReactNode } from "react";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ThemeProvider, QueryProvider, ContactModalProvider } from "@/providers";
import {
  PageMarquees,
  PageLoader,
  GoogleAnalytics,
  CookieConsent,
} from "@/components";
import { Navbar } from "@/layouts";
import { routing, getDirection, openGraphLocales } from "@/i18n";
import { SITE_URL, contactDetails } from "@/lib";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, "params">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((code) => [code, `/${code}`])
        ),
        "x-default": `/${routing.defaultLocale}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    verification: googleVerification ? { google: googleVerification } : undefined,
    authors: [{ name: "GROOVESTREET", url: SITE_URL }],
    creator: "GROOVESTREET",
    publisher: "GROOVESTREET",
    category: "Design",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    appleWebApp: {
      capable: true,
      title: "GROOVESTREET",
      statusBarStyle: "black-translucent",
    },
    generator: "GROOVESTREET",
    manifest: "/site.webmanifest",
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any", type: "image/x-icon" },
        { url: "/favicon.svg", type: "image/svg+xml" },
      ],
      apple: "/apple-touch-icon.png",
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: `/${locale}`,
      siteName: t("siteName"),
      images: [
        {
          url: "/image.png",
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
        },
      ],
      locale: hasLocale(routing.locales, locale)
        ? openGraphLocales[locale]
        : openGraphLocales[routing.defaultLocale],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/image.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "metadata" });
  const organizationId = `${SITE_URL}#organization`;
  const websiteId = `${SITE_URL}#website`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": organizationId,
        name: "GROOVESTREET",
        alternateName: "GrooveStreet Software",
        url: SITE_URL,
        logo: `${SITE_URL}/web-app-manifest-512x512.png`,
        image: `${SITE_URL}/image.png`,
        description: t("description"),
        email: contactDetails.email,
        telephone: contactDetails.phoneTel,
        priceRange: "UGX 20,000–1,300,000",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kampala",
          addressCountry: "UG",
        },
        areaServed: [
          { "@type": "City", name: "Kampala" },
          { "@type": "Country", name: "Uganda" },
          { "@type": "Place", name: "East Africa" },
          { "@type": "Place", name: "Worldwide" },
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: contactDetails.phoneTel,
            contactType: "customer service",
            availableLanguage: ["en", "fr", "de"],
          },
        ],
        sameAs: ["https://github.com/GrooveStreet-Software"],
        knowsLanguage: ["en", "fr", "de"],
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
            ],
            opens: "09:00",
            closes: "18:00",
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Design and development services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Landing page website",
                provider: { "@id": organizationId },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Custom multi-page website",
                provider: { "@id": organizationId },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Signature website or e-commerce store",
                provider: { "@id": organizationId },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Graphic design",
                provider: { "@id": organizationId },
              },
            },
          ],
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: `${SITE_URL}/${locale}`,
        name: "GROOVESTREET",
        description: t("description"),
        inLanguage: locale,
        publisher: { "@id": organizationId },
      },
    ],
  };

  return (
    <html
      lang={locale}
      dir={getDirection()}
      className={`dark ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className={`${inter.className} bg-black mx-auto max-w-[1280px]`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <PageLoader />
        <NextIntlClientProvider>
          <GoogleAnalytics />
          <CookieConsent />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            <QueryProvider>
              <ContactModalProvider>
                <Navbar />
                {children}
              </ContactModalProvider>
            </QueryProvider>
          </ThemeProvider>
          <PageMarquees />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
