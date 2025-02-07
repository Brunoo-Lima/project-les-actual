import { IAddress } from './IAddress';
import { ICreditCard } from './ICreditCard';
import { IProduct } from './IProduct';

export interface IOrder {
  items: IProduct[];
  total: number;
  address: IAddress | null;
  payment: ICreditCard | null;
  status: string;
  freight: number;
  coupon: string | null;
  discountValue: number;
}
