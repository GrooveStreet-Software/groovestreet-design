import { GithubIcon, WhatsAppIcon } from "@/components/icons";
import { githubUrl, whatsappUrl } from "@/lib";

/**
 * Social channels that actually exist. Instagram/X are not set up, so linking
 * them would send visitors to a page that does not exist.
 */
export const socialLinks = [
  { href: whatsappUrl, key: "whatsapp", icon: WhatsAppIcon },
  { href: githubUrl, key: "github", icon: GithubIcon },
] as const;
