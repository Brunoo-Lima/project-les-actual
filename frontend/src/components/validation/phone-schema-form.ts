import * as yup from "yup";

export type IPhoneSchemaForm = yup.InferType<typeof PhoneSchemaForm>;

export const PhoneSchemaForm = yup.object().shape({
  type: yup.string().required("O tipo do telefone é obrigatório"),
  number: yup.string().required("O número do telefone é obrigatório"),
});

export const emptyPhone = {
  type: "",
  number: "",
};
