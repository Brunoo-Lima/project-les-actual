import api, { baseURL } from "./api";
import { toast } from "sonner";
import { IAddress } from "@/@types/IAddress";
import { IPaymentMethodItem } from "@/@types/IOrder";

export interface ICartRequest {
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}

export const listCart = async (userId: string) => {
  try {
    const { data } = await api.get(`/cart?user_id=${userId}`);
    return data;
  } catch (error) {
    console.error("Erro ao buscar carrinho:", error);
    throw error;
  }
};

export interface ICartItemToRemove {
  productId: string;
  quantity?: number; // Opcional para remoção completa
}

export const removeItemFromCart = async (
  userId: string,
  itemsToRemove: ICartItemToRemove[]
) => {
  try {
    const { data, status } = await api.delete(`${baseURL}cart/${userId}`, {
      data: {
        items: itemsToRemove.map((item) => ({
          productId: item.productId,
          quantity: item.quantity || 0, // Se não especificado, remove completamente
        })),
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

export const decrementItemFromCart = async (
  userId: string,
  itemsToRemove: ICartItemToRemove[]
) => {
  try {
    const { data, status } = await api.delete(
      `${baseURL}item/decrement/${userId}`,
      {
        data: {
          items: itemsToRemove.map((item) => ({
            productId: item.productId,
            quantity: item.quantity || 0, // Se não especificado, remove completamente
          })),
        },
      }
    );

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

interface ICreateOrder {
  userId: string;
  addressId: string;
  paymentMethods: IPaymentMethodItem[];
  cartId: string;
  freight: number;
  discountValue?: number; // Opcional, pois pode não haver desconto
}

export const createOrder = async (order: ICreateOrder) => {
  try {
    const { data, status } = await api.post(`${baseURL}checkout`, order);

    if (!data || (status !== 200 && status !== 201)) {
      toast.error("Algo deu errado na requisição");
    }

    return data;
  } catch (error) {
    toast.error("Não foi possível criar o pedido");
  }
};

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
    toast.error("Não foi possível listar os pedidos");
  }
};

export const listOrdersWithoutUserId = async (statusOrder?: string) => {
  try {
    const { data, status } = await api.get(
      `${baseURL}order-list?status=${statusOrder}`
    );

    if (!data || status !== 200) {
      toast.error("Algo deu errado na requisição");
    }

    return data;
  } catch (error) {
    toast.error("Não foi possível listar os pedidos");
  }
};

export type StatusOrder = "Pendente" | "Aprovado" | "Transito" | "Entregue";

export const updateStatusOrder = async (
  orderId: string,
  statusOrder: StatusOrder
) => {
  try {
    const { data, status } = await api.patch(
      `${baseURL}order/status/${orderId}`,
      {
        status: statusOrder,
      }
    );

    if (!data || status !== 200) {
      toast.error("Algo deu errado na requisição");
    }

    return data;
  } catch (error) {
    toast.error("Não foi possível aprovar o pedido");
  }
};
