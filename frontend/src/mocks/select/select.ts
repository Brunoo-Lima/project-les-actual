type Options = {
  value: string;
  label: string;
};

export const selectStatus: Options[] = [
  { value: 'Ativo', label: 'Ativo' },
  { value: 'Inativo', label: 'Inativo' },
];

export const selectFlagCard: Options[] = [
  { value: 'Visa', label: 'Visa' },
  { value: 'Elo', label: 'Elo' },
  { value: 'Mastercard', label: 'Mastercard' },
];

export const selectCategory: Options[] = [
  { value: 'action-figure', label: 'Action Figure' },
];
