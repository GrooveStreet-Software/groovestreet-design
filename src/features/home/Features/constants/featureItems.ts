import { Code2, Layers, TrendingUp } from "lucide-react";
import type { FeatureItem } from "../types";

/**
 * The services we sell. "Custom Website" was removed — it was a second name
 * for the same offer as "Website Design & Build". Graphic design is no longer
 * offered. Software design and development is quoted per project, so it has no
 * on-page price.
 */
export const featureItems: FeatureItem[] = [
  { key: "minimalist", icon: Code2, pricingKey: "standard" },
  { key: "software", icon: Layers },
  { key: "performance", icon: TrendingUp, pricingKey: "seo" },
];
