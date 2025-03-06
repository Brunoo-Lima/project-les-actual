import { IAddress } from "@/@types/IAddress";
import { ICreditCard } from "@/@types/ICreditCard";
import { IOrder } from "@/@types/IOrder";
import { IPhone } from "@/@types/IUser";
import axios from "axios";

export interface ICart {
  id: string;
  items: [];
}

interface IUser {
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
  orders?: IOrder[];
  exchangeCoupon?: string[];
  cart?: ICart;
}

export const getListClient = async () => {
  try {
    const { data, status } = await axios.get("/http://localhost:3333/client");

    if (!data || status !== 200) {
      throw new Error("Algo deu errado");
    }

    if (!data.length) {
      throw new Error("error");
    }

    return data;
  } catch (error) {
    console.error("Error");
  }
};

