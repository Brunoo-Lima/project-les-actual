import * as yup from "yup";

export type ICreditCardSchemaForm = yup.InferType<typeof CreditCardSchemaForm>;

export const CreditCardSchemaForm = yup.object().shape({
  flag: yup.string().required("Bandeira é obrigatório"),
  number: yup.string().required("Número do cartão é obrigatório"),
  namePrinted: yup.string().required("Nome no cartão é obrigatório"),
  cvv: yup.string().required("CVV é obrigatório"),
  dateExpired: yup.string().required("Data de validade é obrigatório"),
  preferential: yup.boolean().optional(),
});

export const emptyCreditCard = {
  flag: "",
  number: "",
  namePrinted: "",
  cvv: "",
  dateExpired: "",
  preferential: false,
};
