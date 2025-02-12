import dayjs from "dayjs";

export const formatDate = (e: React.ChangeEvent<HTMLInputElement>) => {
  const formattedDate = dayjs(e.target.value, "YYYY-MM-DD").format(
    "DD/MM/YYYY"
  );
  return formattedDate;
};
