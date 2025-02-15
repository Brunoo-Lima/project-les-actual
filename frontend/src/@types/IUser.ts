import { ICreditCard } from "./ICreditCard";

export interface IUser {
  id: number;
  name: string;
  email: string;
  cpf: string;
  created_at: string;
  updated_at: string;
  dateOfBirth: string;
  status: string;
  gender: string;
  typePhone: string;
  phone: string;
  address: IAddress;
  creditCard: ICreditCard;
  orders: Order[];
}

export interface IAddress {
  identifier: string;
  street: string;
  number: string;
  neighborhood: string;
  zipCode: string;
  typeResidence: string;
  typePublicPlace: string;
  city: string;
  state: string;
  country: string;
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
