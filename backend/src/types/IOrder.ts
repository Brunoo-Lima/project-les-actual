import { IAddress } from './IUser';

export interface IOrder {
  id: string;
  total: number;
  status: string;
  freight: number;
  discountValue?: number;
  coupon?: number;
  items: [];
  address?: IAddress;
  payments: [];
  exchangeCoupon?: [];
}
