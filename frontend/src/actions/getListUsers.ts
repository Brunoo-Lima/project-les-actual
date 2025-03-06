"use server";

import { getListClient } from "@/services/list-client";

export async function getListUsers() {
  const clients = await getListClient();

  console.log("lci", clients);
  return clients;
}

