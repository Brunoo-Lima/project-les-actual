export interface ICart {
  userId: string;
  items: ICartItem[];
}

export interface ICartItem {
  quantity: number;
  productId: string;
}

// interfaces/ICartResponse.ts
import { Product } from '@prisma/client'; // Ajuste conforme seu schema

export interface ICartItemResponse {
  id: string;
  product: Product;
  quantity: number;
}

export interface ICartResponse {
  id: string;
  userId: string;
  items: ICartItemResponse[];
}
