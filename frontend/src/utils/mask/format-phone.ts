export const formatPhone = (value: string, type?: "Fixo" | "Móvel") => {
  const cleanedValue = value.replace(/\D/g, ""); // Remove caracteres não numéricos

  if (type === "Móvel" && cleanedValue.length === 11) {
    return cleanedValue.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3"); // (00) 00000-0000
  }

  if (type === "Fixo" && cleanedValue.length === 10) {
    return cleanedValue.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3"); // (00) 0000-0000
  }

  return cleanedValue; // Retorna o valor sem formatação se não corresponder aos padrões
};
