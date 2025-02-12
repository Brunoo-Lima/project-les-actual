type Options = {
  value: string;
  label: string;
};

export const selectStatus: Options[] = [
  { value: "Ativo", label: "Ativo" },
  { value: "Inativo", label: "Inativo" },
];

export const selectFlagCard: Options[] = [
  { value: "Visa", label: "Visa" },
  { value: "Elo", label: "Elo" },
  { value: "Mastercard", label: "Mastercard" },
];

export const selectCategory: Options[] = [
  { value: "action-figure", label: "Action Figure" },
];

export const selectTypeResidence: Options[] = [
  { value: "Casa", label: "Casa" },
  { value: "Apartamento", label: "Apartamento" },
  { value: "Casa de Condomínio", label: "Casa de Condomínio" },
  { value: "Cobertura", label: "Cobertura" },
  { value: "Chacara", label: "Chacara" },
  { value: "Casa de Praia", label: "Casa de Praia" },
  { value: "Casa de Campo", label: "Casa de Campo" },
];

export const selectTypePublicPlace: Options[] = [
  { value: "Rua", label: "Rua" },
  { value: "Avenida", label: "Avenida" },
  { value: "Travessa", label: "Travessa" },
  { value: "Alameda", label: "Alameda" },
  { value: "Praça", label: "Praça" },
];
