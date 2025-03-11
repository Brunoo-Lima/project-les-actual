import { IUser } from "@/@types/IUser";

export const createClient = async (user: IUser) => {
  try {
    const response = await fetch("http://localhost:3333/client", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error(`Algo deu errado na requisição: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erro ao criar cliente!");
    throw new Error("Erro ao criar cliente");
  }
};

