import { IAddress } from './IUser';

export interface IOrder {
  id: string;
  userId: string;
  total: number;
  status: string;
  freight: number;
  discountValue?: number;
  items: IItems[];
  address?: IAddress;
  payments: IOrderPayment[];
}

//Continuar mexendo no schema

export interface IItems {
  quantity: number;
  productId: string;
}

export interface IOrderPayment {
  id: string;
  orderId: string;
  paymentMethodId: string;
  amount: number;
  status: string;

  creditCardId?: string;
  exchangeCouponId?: string;
}

export interface IPaymentMethod {
  id: string;
  type: string;

  payments: IOrderPayment[];
}

export interface IExchangeCoupon {
  id: string;
  code: string;
  value: number;
  status: string;
  expiration: Date;

  userId: string;

  payments: IOrderPayment[];
  orderId: string;
}
