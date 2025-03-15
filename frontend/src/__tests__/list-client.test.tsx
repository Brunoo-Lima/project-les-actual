// // __tests__/Users.test.tsx
// import React from "react";
// import { render, screen, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { getListClient } from "@/services/list-client";
// import { deleteClient } from "@/services/client";
// import { Users } from "@/components/layout/admin/users/users";

// // Mock das dependências
// jest.mock("@/services/list-client");
// jest.mock("@/services/client");

// describe("Users", () => {
//   it("deve renderizar o componente e carregar a lista de usuários", async () => {
//     render(<Users />);

//     // Verifica se o título está sendo renderizado
//     expect(screen.getByText("Usuários")).toBeInTheDocument();

//     // Verifica se a lista de usuários está sendo carregada
//     await waitFor(() => {
//       expect(getListClient).toHaveBeenCalled();
//       expect(screen.getByText("João Silva")).toBeInTheDocument();
//       expect(screen.getByText("Maria Souza")).toBeInTheDocument();
//     });
//   });
// });
