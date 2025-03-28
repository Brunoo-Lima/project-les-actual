import { CategoryIsAvailable, IProduct } from "@/@types/IProduct";

const baseUrl = "http://localhost:3333";

export const createProduct = async (productData: FormData) => {
  try {
    const response = await fetch(`http://localhost:3333/product`, {
      method: "POST",
      body: productData,
    });

    console.log("Status da resposta:", response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage =
        errorData.message || `Erro ${response.status}: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro detalhado ao criar produto:", error);
    throw new Error(
      error instanceof Error ? error.message : "Erro ao criar produto"
    );
  }
};

export const listProducts = async () => {
  try {
    const response = await fetch(`http://localhost:3333/products`, {
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
    console.error("Erro ao listar produtos", error);
    throw new Error("Erro ao listar produtos");
  }
};

interface IProductStatus {
  status: boolean;
  categoryIsAvailable: CategoryIsAvailable;
  inactiveReason?: string;
}

export const updateStatusProduct = async (
  product_id: string,
  productData: IProductStatus
) => {
  try {
    const response = await fetch(
      `http://localhost:3333/status-product?product_id=${product_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }
    );

    if (!response.ok) {
      throw new Error(`Algo deu errado na requisição: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erro ao atualizar status do produto", error);
    throw new Error("Erro ao atualizar status do produto");
  }
};
