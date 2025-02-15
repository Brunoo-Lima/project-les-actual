import * as yup from "yup";

export type IPhoneSchemaForm = yup.InferType<typeof PhoneSchemaForm>;

export const PhoneSchemaForm = yup.object().shape({
  typePhone: yup.string().required("O tipo do telefone é obrigatório"),
  numberPhone: yup.string().required("O número do telefone é obrigatório"),
});

export const emptyPhone = {
  typePhone: "",
  numberPhone: "",
};
