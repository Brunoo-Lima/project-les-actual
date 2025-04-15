import { IAddress } from "./IAddress";
import { ICreditCard } from "./ICreditCard";
import { IProduct } from "./IProduct";

export interface IOrder {
  items: ICartItem[];
  total: number;
  address: IAddress | null;
  payment: IPaymentMethod[];
  status: string;
  freight: number;
  coupon: string | null;
  discountValue: number;
}

export interface IPaymentMethod {
  card: ICreditCard;
  value: number;
  installments: number;
}

export interface ICartItem {
  quantity: number;
  productId: string;
  product: IProduct;
  price: number;
}
