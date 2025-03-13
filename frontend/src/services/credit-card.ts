import api from "./api";
import { ICreditCard } from "@/@types/ICreditCard";

export const createCreditCard = async (
  user_id: string,
  creditCard: ICreditCard
) => {
  try {
    const response = await fetch(
      `http://localhost:3333/credit-card?user_id=${user_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creditCard),
      }
    );

    if (!response.ok) {
      throw new Error(`Algo deu errado na requisição - ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Erro ao criar cartão!");
  }
};

export const updateCreditCard = async (
  user_id: string,
  creditCard_id: string,
  creditCard: Partial<ICreditCard>
) => {
  try {
    const response = await fetch(
      `http://localhost:3333/address?user_id=${user_id}&creditCard_id=${creditCard_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creditCard),
      }
    );

    if (!response.ok) {
      throw new Error(`Algo deu errado na requisição - ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Erro ao atualizar cartão!");
  }
};

export const deleteCreditCard = async (
  creditCard_id: string,
  user_id: string
) => {
  try {
    const response = await fetch(
      `http://localhost:3333/credit-card?creditCard_id=${creditCard_id}&user_id=${user_id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Algo deu errado na requisição - ${response.status}`);
    }

    await response.json();
  } catch (error) {
    throw new Error("Erro ao deletar cartão!");
  }
};
