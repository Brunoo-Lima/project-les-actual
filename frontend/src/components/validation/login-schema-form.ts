import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email obrigatório"),
  password: yup.string().required("Senha obrigatória"),
});

export type ILoginSchemaUser = yup.InferType<typeof LoginSchema>;
