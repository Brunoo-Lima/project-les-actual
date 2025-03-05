import * as yup from "yup";

export type IProductSchemaForm = yup.InferType<typeof ProductSchemaForm>;

export const ProductSchemaForm = yup.object().shape({
  image: yup.string().required("A imagem é obrigatória"),
  name: yup.string().required("O nome é obrigatório"),
  description: yup.string().optional(),

  category: yup.string().required("A categoria é obrigatória"),
  price: yup
    .number()
    .typeError("O preço deve ser um número")
    .required("O preço é obrigatório"),
  brand: yup.string().required("A marca é obrigatória"),
  universe: yup.string().required("O universo é obrigatório"),
  material: yup.string().required("O material é obrigatório"),

  quantity: yup
    .number()
    .typeError("A quantidade deve ser um número")
    .integer("A quantidade deve ser um número inteiro")
    .min(0, "A quantidade não pode ser negativa")
    .required("A quantidade é obrigatória"),

  weight: yup
    .number()
    .typeError("O peso deve ser um número")
    .positive("O peso deve ser maior que zero")
    .required("O peso é obrigatório"),
  height: yup
    .number()
    .typeError("A altura deve ser um número")
    .positive("A altura deve ser maior que zero")
    .required("A altura é obrigatória"),
  width: yup
    .number()
    .typeError("A largura deve ser um número")
    .positive("A largura deve ser maior que zero")
    .required("A largura é obrigatória"),
  depth: yup
    .number()
    .typeError("A profundidade deve ser um número")
    .positive("A profundidade deve ser maior que zero")
    .required("A profundidade é obrigatória"),

  isAvailable: yup.boolean().default(true),
  inactiveReason: yup.string().optional(),
});

export type IStatusSchemaForm = yup.InferType<typeof StatusSchemaForm>;

export const StatusSchemaForm = yup.object().shape({
  status: yup.string().required("O status é obrigatório"),
});

// export type ICouponSchemaForm = yup.InferType<typeof CouponSchemaForm>;

// export const CouponSchemaForm = yup.object().shape({
//   coupon: yup.string(),
// });
