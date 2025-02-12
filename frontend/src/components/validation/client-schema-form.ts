import * as yup from "yup";

export type IClientSchemaForm = yup.InferType<typeof ClientSchemaForm>;

export const ClientSchemaForm = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  dateOfBirth: yup.string().required("Data de nascimento é obrigatória"),
  cpf: yup.string().required("CPF é obrigatório"),
  gender: yup.string().required("Gênero é obrigatório"),
  typePhone: yup.string().required("Tipo do telefone é obrigatório"),
  // ddd: yup.string().required("DDD é obrigatório"),
  numberPhone: yup.string().required("Número do telefone é obrigatório"),
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

  // addresses: yup
  //   .array()
  //   .of(AddressClientSchemaForm)
  //   .min(1, "Pelo menos um endereço deve ser adicionado"),
  // creditCards: yup
  //   .array()
  //   .of(CreditCardSchemaForm)
  //   .min(1, "Pelo menos um cartão deve ser adicionado"),

  zipCode: yup.string().required("CEP é obrigatório"),
  typeResidence: yup.string().required("Tipo de residência é obrigatório"),
  neighborhood: yup.string().required("Bairro é obrigatório"),
  number: yup.string().required("Número é obrigatório"),
  street: yup.string().required("Rua é obrigatório"),
  typePublicPlace: yup.string().required("Tipo de logradouro é obrigatório"),
  city: yup.string().required("Cidade é obrigatória"),
  state: yup.string().required("Estado é obrigatório"),
  country: yup.string().required("Pais é obrigatório"),
});

export const emptyClient = {
  name: "",
  dateOfBirth: "",
  cpf: "",
  gender: "",
  typePhone: "",
  numberPhone: "",
  email: "",
  password: "",
  confirmPassword: "",
  zipCode: "",
  typeResidence: "",
  neighborhood: "",
  number: "",
  street: "",
  typePublicPlace: "",
  city: "",
  state: "",
  country: "Brasil",
};

export const mockClient = {
  id: 1,
  name: "João da Silva",
  dateOfBirth: "1990-01-01",
  cpf: "12345678900",
  gender: "Masculino",
  typePhone: "Celular",
  numberPhone: "123456789",
  email: "lTlQZ@example.com",
  password: "12345678",
  confirmPassword: "12345678",
  zipCode: "08695-065",
  typeResidence: "Casa",
  number: "123",
  typePublicPlace: "Rua",
  state: "SP",
};
