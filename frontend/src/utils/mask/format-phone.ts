export const formatPhone = (value = "") => {
  if (value.length > 10) {
    return value
      .replace(/[^0-9]/g, "")
      .replace(/^(\d{2})(\d{5})(\d{4})$.*/, "($1) $2-$3");
  }

  return value
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{2})(\d{4})(\d{4})$.*/, "($1) $2-$3");
};
