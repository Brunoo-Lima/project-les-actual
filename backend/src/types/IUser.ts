import { ICart } from './ICart';
import { ICreditCard } from './ICreditCard';
import { IOrder } from './IOrder';

export interface IUser {
  name: string;
  email: string;
  password: string;
  cpf: string;
  dateOfBirth: string;
  gender: string;
  phones: IPhone[];
  addresses: IAddress[];
  creditCards: ICreditCard[];
  orders?: IOrder[];
  exchangeCoupon?: string[];
  cart?: ICart;
}

export interface IPhone {
  id: string;
  number: string;
  type: string;
}

export interface IAddress {
  id: string;
  zipCode: string;
  typeResidence: string;
  neighborhood: string;
  number: string;
  typePublicPlace: string;
  publicPlace: string;
  street: string;
  city: string;
  state: string;
  country: string;
  observation?: string;
  delivery: boolean;
  charge: boolean;
  identifier: string;
  identifierDelivery: string;
}
