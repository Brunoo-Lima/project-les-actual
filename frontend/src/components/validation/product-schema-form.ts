import * as yup from 'yup';

export type IProductSchemaForm = yup.InferType<typeof ProductSchemaForm>;

export const ProductSchemaForm = yup.object().shape({
  image: yup.mixed().test('required', 'A imagem é obrigatória', (value) => {
    return value instanceof File;
  }),
  category: yup.string().required('A categoria é obrigatória'),
  name: yup.string().required('O nome é obrigatório'),
  anime: yup.string().required('O anime é obrigatório'),
  price: yup.string().required('O preço é obrigatório'),
  stock: yup.string().required('O estoque é obrigatório'),
});

export type IStatusSchemaForm = yup.InferType<typeof StatusSchemaForm>;

export const StatusSchemaForm = yup.object().shape({
  status: yup.string().required('O status é obrigatório'),
});
