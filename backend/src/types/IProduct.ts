export interface IProduct {
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;

  brand: string;
  universe: string;
  material: string;

  weight: number;
  height: number;
  width: number;
  depth: number;

  isAvailable: boolean;
  inactiveReason?: string;

  pricingGroupId?: string;
}
