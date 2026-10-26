import { GithubIcon, WhatsAppIcon } from "@/components/icons";
import { githubUrl, whatsappUrl } from "@/lib";

/** Social channels that actually exist. */
export const contactSocials = [
  { key: "whatsapp", href: whatsappUrl, icon: WhatsAppIcon },
  { key: "github", href: githubUrl, icon: GithubIcon },
] as const;
