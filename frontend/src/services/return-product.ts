import { toast } from "sonner";
import api from "./api";
import { StatusOrder } from "./order";

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
    const { data, status } = await api.post(`return-product/${userId}`, {
      orderId,
      items,
      reason,
    });

    if (!data || status !== 201) {
      throw new Error("Erro ao criar pedido de devolução");
    }

    return data;
  } catch (error) {
    console.error(error);
    toast.error("Erro ao solicitar devolução");
    throw error;
  }
};

export const getListReplacements = async () => {
  try {
    const { data, status } = await api.get(`/return-products`);

    if (!data || status !== 200) {
      throw new Error("Erro ao buscar pedidos de devoluções");
    }

    return data;
  } catch (error) {
    console.error("Erro ao buscar pedidos de devoluções:", error);
    toast.error("Erro ao listar pedidos de devoluções");
    throw error;
  }
};

export const updateReplacement = async (
  exchangeId: string,
  status: StatusOrder
) => {
  try {
    const { data } = await api.patch(`return-product/status`, {
      id: exchangeId,
      status,
    });

    // if (!data || status !== 200) {
    //   throw new Error("Erro ao atualizar pedido de troca");
    // }

    return data;
  } catch (error) {
    console.error("Erro ao atualizar status de devolução", error);
    toast.error("Erro ao atualizar status de devolução");
    throw error;
  }
};

export const getListReplacementsStatus = async (newStatus: StatusOrder) => {
  try {
    const { data } = await api.get(
      `/return-product/status/?status=${newStatus}`
    );

    if (!data) {
      throw new Error("Erro ao buscar pedidos de devoluções");
    }

    return data;
  } catch (error) {
    console.error("Erro ao listar pedidos de devoluções", error);
    toast.error("Erro ao listar pedidos de devoluções");
    throw error;
  }
};
