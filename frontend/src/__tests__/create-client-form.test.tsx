// // __tests__/RegisterUser.test.tsx
// import React from "react";
// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { useData } from "@/hooks/useData";
// import { RegisterUser } from "@/components/layout/user/forms/register-user/register-user";
// import { useRouter } from "next/navigation";
// import { createClient } from "@/services/client";

// // Mock das dependências
// jest.mock("@/services/client");
// jest.mock("next/navigation", () => ({
//   useRouter: jest.fn(),
// }));
// jest.mock("@/hooks/useData", () => ({
//   useData: jest.fn(),
// }));

// const mockPush = jest.fn();
// const mockSetUsers = jest.fn();

// beforeEach(() => {
//   // Mock do fetch
//   global.fetch = jest.fn(() =>
//     Promise.resolve({
//       ok: true,
//       json: () => Promise.resolve({ id: 1, name: "João Silva" }),
//     })
//   ) as jest.Mock;

//   // Mock do useRouter
//   (useRouter as jest.Mock).mockReturnValue({
//     push: mockPush,
//   });

//   // Mock do useData
//   (useData as jest.Mock).mockReturnValue({
//     setUsers: mockSetUsers,
//   });

//   // Mock do createClient
//   (createClient as jest.Mock).mockResolvedValue({ id: 1, name: "João Silva" });
// });

// afterEach(() => {
//   jest.clearAllMocks();
// });

// describe("RegisterUser", () => {
//   it("deve criar um cliente e redirecionar para a página de usuários", async () => {
//     render(<RegisterUser />);

//     expect(screen.getByText("Cadastro de cliente")).toBeInTheDocument();

//     // Preenche os campos do formulário
//     await userEvent.type(
//       screen.getByPlaceholderText("Digite o nome"),
//       "João Silva"
//     );
//     await userEvent.type(
//       screen.getByPlaceholderText("Digite o CPF"),
//       "123.456.789-00"
//     );
//     await userEvent.type(
//       screen.getByLabelText("Data de nascimento"),
//       "1990-01-01"
//     );
//     await userEvent.type(
//       screen.getByPlaceholderText("Digite o email"),
//       "joao@example.com"
//     );
//     await userEvent.type(
//       screen.getByPlaceholderText("Digite a senha"),
//       "@Teste123"
//     );
//     await userEvent.type(
//       screen.getByPlaceholderText("Digite a senha novamente"),
//       "@Teste123"
//     );

//     await userEvent.type(screen.getByLabelText("Masculino"), "Masculino");

//     // Adiciona um telefone
//     fireEvent.click(screen.getByText("Adicionar telefone"));
//     await userEvent.type(screen.getByLabelText("Telefone"), "11987654321");
//     fireEvent.click(screen.getByLabelText("Celular"));

//     // Adiciona um endereço
//     fireEvent.click(screen.getByText("Adicionar endereço"));
//     await userEvent.type(
//       screen.getByPlaceholderText("Digite o cep"),
//       "12345-678"
//     );
//     await userEvent.type(
//       screen.getByPlaceholderText("Digite a rua"),
//       "Rua das Flores"
//     );
//     await userEvent.type(screen.getByPlaceholderText("Digite o número"), "123");
//     await userEvent.type(
//       screen.getByPlaceholderText("Digite o bairro"),
//       "Centro"
//     );

//     await userEvent.selectOptions(
//       screen.getByLabelText("Tipo residência"),
//       "Casa"
//     );

//     await userEvent.selectOptions(
//       screen.getByLabelText("Tipo Logradouro"),
//       "Rua"
//     );
//     await userEvent.type(
//       screen.getByPlaceholderText("Digite a cidade"),
//       "São Paulo"
//     );

//     await userEvent.type(
//       screen.getByPlaceholderText("Digite o número"),
//       "São Paulo"
//     );

//     await userEvent.type(
//       screen.getByPlaceholderText("Digite o país"),
//       "Brasil"
//     );

//     await userEvent.type(
//       screen.getByLabelText("Nome endereço de entrega"),
//       "Casa"
//     );

//     await userEvent.type(
//       screen.getByLabelText("Nome endereço"),
//       "Casa"
//     );

//     await userEvent.dblClick(
//       screen.getByLabelText("Entrega"),
//       true
//     );

//     await userEvent.selectOptions(screen.getByLabelText("Estado"), "São Paulo");

//     // Adiciona um cartão de crédito
//     fireEvent.click(screen.getByText("Adicionar cartão de crédito"));
//     await userEvent.type(
//       screen.getByPlaceholderText("Digite o número do cartão"),
//       "1234567812345678"
//     );
//     await userEvent.type(
//       screen.getByPlaceholderText("Digite o nome do titular"),
//       "João Silva"
//     );
//     await userEvent.type(
//       screen.getByPlaceholderText("Digite a data de validade"),
//       "2030-01-01"
//     );
//     await userEvent.type(screen.getByPlaceholderText("Digite o CVV"), "123");

//     // Submete o formulário
//     fireEvent.click(screen.getByText("Cadastrar"));

//     // Verifica se o cliente foi criado e o redirecionamento ocorreu
//     await waitFor(() => {
//       expect(createClient).toHaveBeenCalledWith({
//         name: "João Silva",
//         cpf: "123.456.789-00",
//         dateOfBirth: "1990-01-01",
//         gender: "Feminino",
//         email: "joao@example.com",
//         password: "@Teste123",
//         confirmPassword: "@Teste123",
//         phones: [
//           {
//             type: "Celular",
//             number: "11987654321",
//           },
//         ],
//         addresses: [
//           {
//             cep: "12345-678",
//             street: "Rua das Flores",
//             number: "123",
//             neighborhood: "Centro",
//             city: "São Paulo",
//             state: "SP",
//           },
//         ],
//         creditCards: [
//           {
//             flag: "Visa",
//             number: "1234567812345678",
//             printedName: "João Silva",
//             dateExpired: "2030-01-01",
//             cvv: "123",
//             preferential: true,
//           },
//         ],
//       });
//       expect(mockSetUsers).toHaveBeenCalled();
//       expect(mockPush).toHaveBeenCalledWith("/usuarios");
//     });
//   });
// });
