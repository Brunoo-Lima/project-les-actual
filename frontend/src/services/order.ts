import api, { baseURL } from "./api";
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
    const { data, status } = await api.post(`${baseURL}cart`, {
      userId: cart.userId,
      items: cart.items,
    });

    if (!data || (status !== 200 && status !== 201)) {
      toast.error("Algo deu errado na requisição");
    }

    console.log("Carrinho criado/atualizado:", data);

    return data;
  } catch (error: any) {
    console.error(error);
    toast.error("Erro ao criar carrinho");
  }
};

export const listCart = async (userId: string) => {
  try {
    const { data } = await api.get(`/cart?user_id=${userId}`);
    return data;
  } catch (error) {
    console.error("Erro ao buscar carrinho:", error);
    throw error;
  }
};

export const removeItemFromCart = async (
  userId: string,
  itemsToRemove: Array<{ productId: string }>
) => {
  try {
    const { data, status } = await api.delete(`${baseURL}cart/${userId}`, {
      data: {
        items: itemsToRemove,
      },
    });

    if (status !== 200) {
      toast.error("Algo deu errado ao tentar remover");
    }

    return data;
  } catch (error) {
    toast.error("Algo deu errado ao remover");
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
