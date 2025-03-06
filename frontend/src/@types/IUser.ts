import { IAddress } from "./IAddress";
import { ICart } from "./ICart";
import { ICreditCard } from "./ICreditCard";

export interface IUser {
  id: number;
  // id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  cpf: string;
  dateOfBirth: string;
  gender: string;
  phones: IPhone[];
  addresses: IAddress[];
  creditCards: ICreditCard[];
  orders?: Order[];
  exchangeCoupon?: string[];
  cart?: ICart;

  status: boolean;
  inactiveReason?: string;

  created_at?: string;
  updated_at?: string;
}

export interface IPhone {
  id: number;
  typePhone: string;
  numberPhone: string;
}

export interface Order {
  id: number;
  status: string;
  created_at: string;
  updated_at: string;
  items: Item[];
}

export interface Item {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
