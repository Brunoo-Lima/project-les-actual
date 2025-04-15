import { toast } from "sonner";
import api, { baseURL } from "./api";

export const increaseItem = async (user_id: string, productId: string) => {
  try {
    const { data, status } = await api.patch(
      `${baseURL}cart/increase?user_id=${user_id}`,
      {
        productId,
      }
    );

    if (!data || (status !== 200 && status !== 201)) {
      toast.error("Algo deu errado na requisição");
    }

    return data;
  } catch (error: any) {
    console.error(error);
    toast.error("Erro ao criar carrinho");
  }
};

export const decreaseItem = async (user_id: string, productId: string) => {
  try {
    const { data, status } = await api.patch(
      `${baseURL}cart/decrease?user_id=${user_id}`,
      {
        productId,
      }
    );

    if (!data || (status !== 200 && status !== 201)) {
      toast.error("Algo deu errado na requisição");
    }

    return data;
  } catch (error: any) {
    console.error(error);
    toast.error("Erro ao criar carrinho");
  }
};
