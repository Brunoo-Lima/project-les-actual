export const fetchLogin = async (
  email: string,
  password: string,
  role: "CLIENT" | "ADMIN"
) => {
  try {
    const response = await fetch("http://localhost:3333/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, role }),
    });

    if (!response.ok) {
      throw new Error(`Algo deu errado na requisição: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao realizar login");
  }
};
