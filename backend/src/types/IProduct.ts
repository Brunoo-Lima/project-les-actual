export interface IProduct {
  name: string;
  description: string;
  image: string;
  price: number;

  brand: string;
  universe: string;
  material: string;

  weight: number;
  height: number;
  width: number;
  depth: number;
  quantity: number;

  isAvailable: boolean;
  categoryIsAvailable: CategoryIsAvailable;
  inactiveReason?: string;

  pricingGroupId?: string;
}

export enum CategoryIsAvailable {
  FORA_DE_MERCADO = 'FORA_DE_MERCADO',
  INDISPONIVEL = 'INDISPONIVEL',
  EM_ESTOQUE = 'EM_ESTOQUE',
}
