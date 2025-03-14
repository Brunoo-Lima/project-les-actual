import { IPhone } from "@/@types/IUser";

export const createPhone = async (user_id: string, phone: IPhone) => {
  try {
    const response = await fetch(
      `http://localhost:3333/phone?user_id=${user_id}`,
      {
        method: "PUT",
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
    throw new Error("Erro ao criar telefone!");
  }
};

export const updatePhone = async (
  user_id: string,
  phone_id: string,
  phone: Partial<IPhone>
) => {
  try {
    const response = await fetch(
      `http://localhost:3333/phone?user_id=${user_id}&phone_id=${phone_id}`,
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

export const deletePhone = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3333/phone?phone_id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Algo deu errado na requisição - ${response.status}`);
    }

    const data = await response.json();

    console.log("Deletando telefone com ID: aaa", id);

    return data;
  } catch (error) {
    console.error("Erro ao deletar telefone!", error);
    throw new Error("Erro ao deletar telefone!");
  }
};
