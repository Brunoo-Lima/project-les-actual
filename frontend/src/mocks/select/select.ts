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

export const selectCategoryIsAvailable: Options[] = [
  { value: "FORA_DE_MERCADO", label: "FORA DE MERCADO" },
  { value: "INDISPONIVEL", label: "INDISPONIVEL" },
  { value: "EM_ESTOQUE", label: "EM ESTOQUE" },
];

export const selectStates: Options[] = [
  { value: "AC", label: "Acre" },
  { value: "AL", label: "Alagoas" },
  { value: "AP", label: "Amapá" },
  { value: "AM", label: "Amazonas" },
  { value: "BA", label: "Bahia" },
  { value: "CE", label: "Ceará" },
  { value: "DF", label: "Distrito Federal" },
  { value: "ES", label: "Espírito Santo" },
  { value: "GO", label: "Goiás" },
  { value: "MA", label: "Maranhão" },
  { value: "MT", label: "Mato Grosso" },
  { value: "MS", label: "Mato Grosso do Sul" },
  { value: "MG", label: "Minas Gerais" },
  { value: "PA", label: "Pará" },
  { value: "PB", label: "Paraíba" },
  { value: "PR", label: "Paraná" },
  { value: "PE", label: "Pernambuco" },
  { value: "PI", label: "Piauí" },
  { value: "RJ", label: "Rio de Janeiro" },
  { value: "RN", label: "Rio Grande do Norte" },
  { value: "RS", label: "Rio Grande do Sul" },
  { value: "RO", label: "Rondônia" },
  { value: "RR", label: "Roraima" },
  { value: "SC", label: "Santa Catarina" },
  { value: "SP", label: "São Paulo" },
  { value: "SE", label: "Sergipe" },
  { value: "TO", label: "Tocantins" },
];

export const selectParcelas: Options[] = [
  { value: "1x", label: "1x" },
  { value: "2x", label: "2x" },
  { value: "3x", label: "3x" },
  { value: "4x", label: "4x" },
  { value: "5x", label: "5x" },
  { value: "6x", label: "6x" },
  { value: "7x", label: "7x" },
  { value: "8x", label: "8x" },
  { value: "9x", label: "9x" },
];
