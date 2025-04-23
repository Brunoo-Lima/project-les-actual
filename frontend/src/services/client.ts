import { IUser } from "@/@types/IUser";
import { useMutation, useQuery } from "@tanstack/react-query";
import { revalidatePath } from "next/cache";
import api from "./api";
import { toast } from "sonner";

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

export const deleteClient = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3333/client?user_id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Algo deu errado na requisição: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erro ao deletar cliente!");
    throw new Error("Erro ao deletar cliente");
  }
};

export const detailClient = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3333/client?user_id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Algo deu errado na requisição: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erro ao trazer dados do cliente!");
    throw new Error("Erro ao trazer dados do  cliente");
  }
};

export const updateClient = async (id: string, user: Partial<IUser>) => {
  try {
    const response = await fetch(`http://localhost:3333/client?user_id=${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
      // next: {
      //   tags: ["statusClient"],
      // },
    });

    if (!response.ok) {
      throw new Error(`Algo deu errado na requisição: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao atualizar o cliente!", error);
    throw new Error("Erro ao atualizar o cliente");
  }
};

export const updateStatusClient = async (
  id: string,
  user: Pick<IUser, "status" | "inactiveReason">
) => {
  try {
    const response = await fetch(
      `http://localhost:3333/statusClient?user_id=${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
        // next: {
        //   tags: ["statusClient"],
        // },
      }
    );

    if (!response.ok) {
      throw new Error(`Algo deu errado na requisição: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao atualizar status do cliente!", error);
    throw new Error("Erro ao atualizar status do cliente");
  }
};

// export const filterClient = async (client: IUser) => {
//   try {
//     const data = await fetch("http://localhost:3333/client/filter", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(client || {}),
//     });

//     if (!data.ok) {
//       throw new Error(`Algo deu errado na requisição: ${data.statusText}`);
//     }

//     return data;
//   } catch (error) {}
// };

export const filterClient = async (client: IUser) => {
  const { data, status } = await api.post("client/filter", {
    client,
  });

  if (status !== 200 && status !== 201) {
    toast.error("Algo deu errado na requisição");
  }

  return data;
};

export const useFilterClient = () => {
  return useMutation({
    mutationFn: filterClient,
  });
};
