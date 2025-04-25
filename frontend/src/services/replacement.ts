import { toast } from "sonner";
import api from "./api";
import { ExchangeStatus } from "@/@types/IReplacement";

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

export const getListReplacements = async () => {
  try {
    const { data, status } = await api.get(`/replacements`);

    if (!data || status !== 200) {
      throw new Error("Erro ao buscar pedidos de trocas");
    }

    return data;
  } catch (error) {
    console.error("Erro ao buscar trocas:", error);
    toast.error("Erro ao listar pedidos de troca");
    throw error;
  }
};

export const updateReplacement = async (
  exchangeId: string,
  status: ExchangeStatus
) => {
  try {
    const { data } = await api.patch(`replacement/status`, {
      id: exchangeId,
      status,
    });

    // if (!data || status !== 200) {
    //   throw new Error("Erro ao atualizar pedido de troca");
    // }

    return data;
  } catch (error) {
    console.error("Erro ao atualizar status de troca", error);
    toast.error("Erro ao atualizar status de troca");
    throw error;
  }
};

export const getListReplacementsStatus = async (newStatus: ExchangeStatus) => {
  try {
    const { data } = await api.get(`/replacements/status/?status=${newStatus}`);

    if (!data) {
      throw new Error("Erro ao buscar pedidos de trocas");
    }

    return data;
  } catch (error) {
    console.error("Erro ao listar pedidos de troca", error);
    toast.error("Erro ao listar pedidos de trocaa");
    throw error;
  }
};
