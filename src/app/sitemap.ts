import type { MetadataRoute } from "next";
import { routing } from "@/i18n";
import { SITE_URL, samplePreviews } from "@/lib";

const pages = [
  { path: "", changeFrequency: "monthly", priority: 1 },
  { path: "/samples", changeFrequency: "monthly", priority: 0.9 },
  { path: "/about", changeFrequency: "yearly", priority: 0.8 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.3 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.3 },
] as const;

const sampleImages = samplePreviews.map(({ image }) => `${SITE_URL}${image}`);

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routing.locales.flatMap((locale) =>
    pages.map((page) => {
      const languages = Object.fromEntries(
        routing.locales.map((code) => [code, `${SITE_URL}/${code}${page.path}`])
      );

      languages["x-default"] = `${SITE_URL}/${routing.defaultLocale}${page.path}`;

      return {
        url: `${SITE_URL}/${locale}${page.path}`,
        lastModified,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: { languages },
        images:
          page.path === "/samples"
            ? sampleImages
            : page.path === ""
              ? [`${SITE_URL}/image.png`]
              : undefined,
      };
    })
  );
}
