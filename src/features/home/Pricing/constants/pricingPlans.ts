import type { PricingPlanItem } from "../types";

/**
 * Prices live in the locale messages (pricing.plans.<key>.price) so the
 * English/French/German files stay the single source of truth.
 */
export const pricingPlans: PricingPlanItem[] = [
  { key: "graphic", price: 20000, popular: false },
  { key: "basic", price: 200000, popular: false },
  { key: "standard", price: 500000, popular: true },
  { key: "premium", price: 1300000, popular: false },
];
