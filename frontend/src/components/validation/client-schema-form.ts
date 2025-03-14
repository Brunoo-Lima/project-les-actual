import * as yup from "yup";
import { AddressSchemaForm } from "./address-schema-form";
import { CreditCardSchemaForm } from "./credit-card-schema-form";
import { PhoneSchemaForm } from "./phone-schema-form";

export type IClientSchemaForm = yup.InferType<typeof ClientSchemaForm>;

export const ClientSchemaForm = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  dateOfBirth: yup.string().required("Data de nascimento é obrigatória"),
  cpf: yup.string().required("CPF é obrigatório"),
  gender: yup.string().required("Gênero é obrigatório"),
  status: yup.string().optional(),
  email: yup.string().required("Email é obrigatório"),
  password: yup
    .string()
    .required("Senha é obrigatória")
    .min(8, "Senha deve ter no mínimo 8 caracteres"),
  confirmPassword: yup
    .string()
    .required("Confirmação de senha é obrigatória")
    .oneOf([yup.ref("password")], "As senhas devem ser iguais")
    .min(8, "Senha deve ter no mínimo 8 caracteres"),

  phones: yup
    .array()
    .of(PhoneSchemaForm)
    .min(1, "Pelo menos um telefone deve ser adicionado"),

  addresses: yup
    .array()
    .of(AddressSchemaForm)
    .min(1, "Pelo menos um endereço deve ser adicionado"),
  creditCards: yup
    .array()
    .of(CreditCardSchemaForm)
    .min(1, "Pelo menos um cartão deve ser adicionado"),
});

export const emptyClient = {
  name: "",
  dateOfBirth: "",
  cpf: "",
  gender: "",
  email: "",
  password: "",
  confirmPassword: "",
  phones: [],
  addresses: [],
  creditCards: [],
};

// zipCode: "",
// typeResidence: "",
// neighborhood: "",
// number: "",
// street: "",
// typePublicPlace: "",
// city: "",
// state: "",
// country: "Brasil",

export const mockClient = {
  id: 1,
  name: "João da Silva",
  dateOfBirth: "1990-01-01",
  cpf: "12345678900",
  gender: "Masculino",
  email: "teste@example.com",
  password: "@Teste123",
  confirmPassword: "@Teste123",
  addresses: [
    {
      id: 1,
      identifier: "Casa",
      zipCode: "12345-678",
      street: "Rua A",
      typeResidence: "Casa",
      neighborhood: "Bairro A",
      number: "123",
      typePublicPlace: "Rua",
      city: "Suzano",
      state: "SP",
      country: "Brasil",
      observation: "Observação",
      delivery: true,
      charge: true,
      identifierDelivery: "Casa",
    },
  ],
  creditCards: [
    {
      id: 1,
      flag: "Visa",
      number: "5555-5555-5555-5555",
      cvv: "1230",
      namePrinted: "Bruno Lima",
      dateExpired: "12/2030",
      preferential: true,
    },
  ],
  phones: [
    {
      id: 1,
      type: "Celular",
      number: "1234567890",
    },
  ],
};
