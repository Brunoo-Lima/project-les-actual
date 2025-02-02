import { IAddress } from './IAddress';
import { ICreditCard } from './ICreditCard';
import { IProduct } from './IProduct';

export interface IOrder {
  products: IProduct[];
  addresses: IAddress;
  creditCards: ICreditCard;
}
