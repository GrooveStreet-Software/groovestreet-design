import type { PricingPlanItem } from "../types";

/**
 * Single source of truth for prices. The `pricing.plans.<key>.price` entries in
 * the locale messages are display-only and are not read by the pricing cards.
 */
export const pricingPlans: PricingPlanItem[] = [
  { key: "graphic", price: 20000, popular: false },
  { key: "basic", price: 200000, popular: false },
  { key: "standard", price: 500000, popular: true },
  { key: "premium", price: 1300000, popular: false },
];
