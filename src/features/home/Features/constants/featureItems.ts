import { Code2, Palette, TrendingUp } from "lucide-react";
import type { FeatureItem } from "../types";

/**
 * The three services we sell. "Custom Website" was removed — it was a second
 * name for the same offer as "Website Design & Build".
 */
export const featureItems: FeatureItem[] = [
  { key: "minimalist", icon: Code2, pricingKey: "standard" },
  { key: "responsive", icon: Palette, pricingKey: "graphic" },
  { key: "performance", icon: TrendingUp, pricingKey: "seo" },
];
