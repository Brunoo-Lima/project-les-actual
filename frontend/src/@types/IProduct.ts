export interface IProduct {
  id: string;
  name: string;
  description: string;
  image: File;
  price: number;

  brand: string;
  universe: string;
  material: string;

  weight: number;
  height: number;
  width: number;
  depth: number;
  stock: IStock;

  isAvailable: boolean;
  inactiveReason?: string;
  categoryIsAvailable: CategoryIsAvailable.EM_ESTOQUE;

  pricingGroupId?: string;
}

export interface IStock {
  id: string;
  quantity: number;
}

export enum CategoryIsAvailable {
  FORA_DE_MERCADO = "FORA_DE_MERCADO",
  INDISPONIVEL = "INDISPONIVEL",
  EM_ESTOQUE = "EM_ESTOQUE",
}
