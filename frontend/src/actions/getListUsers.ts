"use server";

import { getListClient } from "@/services/list-client";

export async function getListUsers() {
  try {
    const clients = await getListClient();
    console.log("lci", clients);
    return clients;
  } catch (error) {
    console.error("Error in getListUsers", error);
    return []; // Retorna um array vazio ou outro valor padrão em caso de erro
  }
}
