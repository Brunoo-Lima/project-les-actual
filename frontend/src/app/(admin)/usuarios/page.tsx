import { getListUsers } from "@/actions/getListUsers";
import { Users } from "@/components/layout/admin/users/users";
import { getListClient } from "@/services/list-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Usuários",
};

export default async function UsersPage() {
  // const usersList = await getListUsers();

  // const clients = await getListClient();

  // console.log("usersList", clients);

  // console.log("usersList", usersList);

  // return <Users usersList={usersList} />;
  return <Users />;
}
