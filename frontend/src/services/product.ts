import { IProduct } from "@/@types/IProduct";

const baseUrl = "http://localhost:3333";

export const createProduct = async (
  product: IProduct & { imageFile?: File }
) => {
  try {
    const formData = new FormData();

    Object.keys(product).forEach((key) => {
      if (key !== "imageFile" && product[key] !== undefined) {
        formData.append(key, String(product[key]));
      }
    });

    if (product.imageFile) {
      formData.append("image", product.imageFile); // "image" deve bater com o nome esperado no backend
    }

    const response = await fetch(`http://localhost:3333/product`, {
      method: "POST",
      body: formData,
    });

    console.log("resp", response.json());

    if (!response.ok) {
      throw new Error(`Erro na requisição!: ${response.statusText}`);
    }

    console.log("resp", response.json());

    const data = await response.json();

    console.log("data", data);

    return data;
  } catch (error) {
    console.error("Erro ao criar produto!", error);
    throw new Error("Erro ao criar produto!");
  }
};

