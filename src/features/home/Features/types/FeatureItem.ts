import type { LucideIcon } from "lucide-react";

export interface FeatureItem {
  key: string;
  icon: LucideIcon;
  /** Omit when the service is quoted per project rather than priced on-page. */
  pricingKey?: string;
}
