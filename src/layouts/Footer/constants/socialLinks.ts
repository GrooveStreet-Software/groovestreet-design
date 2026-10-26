import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib";

/**
 * WhatsApp only for now — Instagram/X are not set up, so linking them would
 * send visitors to a page that does not exist.
 */
export const socialLinks = [
  { href: whatsappUrl, key: "whatsapp", icon: MessageCircle },
] as const;
