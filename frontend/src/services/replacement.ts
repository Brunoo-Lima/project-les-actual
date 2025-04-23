import { toast } from "sonner";
import api from "./api";

export const createExchangeOrder = async (
  orderId: string,
  userId: string,
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>,
  reason: string
) => {
  try {
    const { data, status } = await api.post(`replacement/${userId}`, {
      orderId,
      items,
      reason,
    });

    if (!data || status !== 201) {
      throw new Error("Erro ao criar pedido de troca");
    }

    return data;
  } catch (error) {
    console.error(error);
    toast.error("Erro ao solicitar troca");
    throw error;
  }
};
