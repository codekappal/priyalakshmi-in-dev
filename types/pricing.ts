// types/pricing.ts
export interface PricingSectionProps {
  pricingData: PricingModel[]; // Direct array of pricing models
  title?: string;
  description?: string;
}

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  highlight?: boolean;
  features: string[];
  button: {
    text: string;
    variant: "solid" | "flat";
    href: string;
  };
}

export interface PricingModel {
  id: string;
  name: string;
  plans: PricingPlan[];
}
