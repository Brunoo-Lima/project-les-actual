import { ICart } from "@/@types/ICart";
import api from "./api";
import { toast } from "sonner";
import { IAddress } from "@/@types/IAddress";

export interface ICartRequest {
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}

export const createCart = async (cart: ICartRequest) => {
  try {
    const response = await fetch(`http://localhost:3333/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });

    if (!response.ok) {
      throw new Error(`Algo deu errado na requisição: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erro ao criar carrinho!");
    throw new Error("Erro ao criar carrinho");
  }
};

interface IOrderRequest {
  id: string;
  total: number;
  status: string;
  freight: number;
  discountValue?: number;
  address?: IAddress;
  items: {
    id: string;
    quantity: number;
    price: number;
    productId: string;
    orderId: string;
    product: {
      name: string;
      image: string;
    };
  }[];

  // payments: IOrderPayment[];
}

export const listOrders = async (user_id: string) => {
  try {
    const { data, status } = await api.get<IOrderRequest[]>(
      `orders?user_id=${user_id}`
    );

    if (!data || status !== 200) {
      toast.error("Algo deu errado na requisição");
    }

    return data;
  } catch (error) {
    toast.error("Algo deu errado na requisição");
  }
};
