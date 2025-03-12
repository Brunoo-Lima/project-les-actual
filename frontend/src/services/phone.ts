import { IPhone } from "@/@types/IUser";
import api from "./api";
import { ICreditCard } from "@/@types/ICreditCard";

export const createPhone = async (user_id: string, phone: IPhone) => {
  try {
    const response = await fetch(`${api}/phone?user_id=${user_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(phone),
    });

    if (!response.ok) {
      throw new Error(`Algo deu errado na requisição - ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Erro ao criar telefone!");
  }
};

export const updateCreditCard = async (
  user_id: string,
  phone_id: string,
  phone: Partial<ICreditCard>
) => {
  try {
    const response = await fetch(
      `${api}/phone?user_id=${user_id}&phone_id=${phone_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(phone),
      }
    );

    if (!response.ok) {
      throw new Error(`Algo deu errado na requisição - ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Erro ao atualizar telefone!");
  }
};

export const deletePhone = async (phone_id: string) => {
  try {
    const response = await fetch(`${api}/phone?phone_id=${phone_id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Algo deu errado na requisição - ${response.status}`);
    }

    await response.json();
  } catch (error) {
    throw new Error("Erro ao deletar telefone!");
  }
};

