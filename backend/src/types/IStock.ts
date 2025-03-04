import { IProduct } from './IProduct';

export interface IStock {
  id: string;
  product: IProduct;
  quantity: number;
  reserved: number;
}
