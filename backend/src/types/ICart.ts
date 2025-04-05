export interface ICart {
  userId: string;
  items: ICartItem[];
}

export interface ICartItem {
  quantity: number;
  productId: string;
}
