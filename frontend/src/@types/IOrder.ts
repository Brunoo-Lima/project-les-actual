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
  methodId: string;
  amount?: number;
  creditCardId?: string;
  couponCode?: string;
  installments?: number;
}

export interface ICartItem {
  quantity: number;
  productId: string;
  product: IProduct;
  price: number;
}

export interface IPaymentMethodItem {
  methodId: string;
  amount?: number;
  creditCardId?: string;
  couponCode?: string;
  installments?: number;
}

export interface IOrderRequest {
  userId: string;
  addressId: string;
  paymentMethods: IPaymentMethodItem[];
  cartId: string;
  freight: number;
  discountValue?: number;
}
