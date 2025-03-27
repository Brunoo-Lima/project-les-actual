export interface IProduct {
  id: string;
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
  quantity: number;

  isAvailable: boolean;
  inactiveReason?: string;
  categoryIsAvailable: CategoryIsAvailable.EM_ESTOQUE;

  pricingGroupId?: string;
}

export enum CategoryIsAvailable {
  FORA_DE_MERCADO = "FORA_DE_MERCADO",
  INDISPONIVEL = "INDISPONIVEL",
  EM_ESTOQUE = "EM_ESTOQUE",
}
