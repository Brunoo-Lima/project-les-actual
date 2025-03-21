import { IAddress } from "./IAddress";
import { ICreditCard } from "./ICreditCard";
import { IProduct } from "./IProduct";

export interface IOrder {
  items: ICartItem[];
  total: number;
  address: IAddress | null;
  payment: ICreditCard[] | null;
  status: string;
  freight: number;
  coupon: string | null;
  discountValue: number;
}

export interface ICartItem extends IProduct {
  quantity: number;
}
