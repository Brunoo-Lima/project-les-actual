import { toast } from "sonner";
import api, { baseURL } from "./api";

export interface ICartRequest {
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}

export const createCart = async (userId: string) => {
  try {
    const { data, status } = await api.post(`${baseURL}cart`, { userId });

    if (status !== 200 && status !== 201) {
      toast.error("Algo deu errado na requisição");
    }

    return data;
  } catch (error) {
    toast.error("Erro ao verificar/criar carrinho:");
    throw error;
  }
};

export const addItemToCart = async (
  userId: string,
  productId: string,
  quantity: number
) => {
  await createCart(userId);

  try {
    const { data, status } = await api.post(`${baseURL}cart/add-item`, {
      userId,
      items: [{ productId, quantity }],
    });

    if (!data || (status !== 200 && status !== 201)) {
      toast.error("Algo deu errado na requisição");
    }

    return data;
  } catch (error: any) {
    console.error(error);
    toast.error("Sem estoque/Erro ao adicionar item");
  }
};

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
