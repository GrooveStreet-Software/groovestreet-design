import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib";

/** WhatsApp only for now. */
export const contactSocials = [
  { key: "whatsapp", href: whatsappUrl, icon: MessageCircle },
] as const;
