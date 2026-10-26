/**
 * Footer navigation. Homepage section links use full paths so they work from
 * every page; the samples page is a real route.
 */
export const footerLinks = [
  { href: "/#features", key: "features" },
  { href: "/samples", key: "work" },
  { href: "/about", key: "about" },
  { href: "/#process", key: "process" },
  { href: "/#pricing", key: "pricing" },
] as const;
