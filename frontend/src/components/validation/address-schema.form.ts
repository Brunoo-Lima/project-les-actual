import * as yup from 'yup';

export type IAddressSchemaForm = yup.InferType<typeof AddressSchemaForm>;

export const AddressSchemaForm = yup.object().shape({
  zipCode: yup.string().required('CEP é obrigatório'),
  typeResidence: yup.string().required('Tipo de residência é obrigatório'),
  neighborhood: yup.string().required('Bairro é obrigatório'),
  number: yup.string().required('Número é obrigatório'),
  typePublicPlace: yup.string().required('Tipo de logradouro é obrigatório'),
  publicPlace: yup.string().required('Logradouro é obrigatório'),
  city: yup.string().required('Cidade é obrigatória'),
  state: yup.string().required('Estado é obrigatório'),
  country: yup.string().required('Pais é obrigatório'),
  observation: yup.string().optional(),
  delivery: yup.boolean().optional(),
  charge: yup.boolean().optional(),
  identifier: yup.string().required('Identificador do endereço é obrigatório'),
  identifierDelivery: yup.string().when('delivery', (delivery, schema) => {
    return delivery
      ? schema.required('Identificador de entrega é obrigatório')
      : schema.optional();
  }),
});

export const addressEmpty = {
  identifier: '',
  identifierDelivery: '',
  zipCode: '',
  typeResidence: '',
  neighborhood: '',
  number: '',
  typePublicPlace: '',
  publicPlace: '',
  city: '',
  state: '',
  country: 'Brasil',
  observation: '',
  delivery: false,
  charge: false,
};
