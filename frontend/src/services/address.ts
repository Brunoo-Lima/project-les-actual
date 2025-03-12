import { IAddress } from "@/@types/IAddress";
import api from "./api";

export const createAddress = async (user_id: string, address: IAddress) => {
  try {
    const response = await fetch(`${api}/address?user_id=${user_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    });

    if (!response.ok) {
      throw new Error(`Algo deu errado na requisição - ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Erro ao criar endereço!");
  }
};

export const updateAddress = async (
  user_id: string,
  address_id: string,
  address: Partial<IAddress>
) => {
  try {
    const response = await fetch(
      `${api}/address?user_id=${user_id}&address_id=${address_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
      }
    );

    if (!response.ok) {
      throw new Error(`Algo deu errado na requisição - ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Erro ao atualizar endereço!");
  }
};

export const deleteAddress = async (address_id: string, user_id: string) => {
  try {
    const response = await fetch(
      `${api}/address?address_id=${address_id}&user_id=${user_id}`,
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
    throw new Error("Erro ao deletar endereço!");
  }
};

