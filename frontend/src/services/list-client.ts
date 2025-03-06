import { IAddress } from "@/@types/IAddress";
import { ICreditCard } from "@/@types/ICreditCard";
import { IOrder } from "@/@types/IOrder";
import { IPhone } from "@/@types/IUser";

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
    const response = await fetch("http://localhost:3333/clients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Algo deu errado na requisição: ${response.statusText}`);
    }

    const data = await response.json();

    console.log("data", data);

    if (!data.length) {
      throw new Error("Nenhum cliente encontrado!");
    }

    return data;
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
};
