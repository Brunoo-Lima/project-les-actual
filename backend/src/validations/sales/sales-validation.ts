class SalesValidation {
  validateDates(startDate?: Date, endDate?: Date): void {
    if (!startDate || !endDate) {
      throw new Error('Data de início e data de término são obrigatórias');
    }

    if (startDate > endDate) {
      throw new Error(
        'A data de início não pode ser posterior à data de término'
      );
    }

    if (startDate > new Date()) {
      throw new Error('A data de início não pode ser no futuro');
    }
  }
}

export { SalesValidation };
