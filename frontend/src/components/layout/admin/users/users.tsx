"use client";

import { TitlePage } from "@/components/ui/title/title-page/title-page";
import { TableUser } from "./table/table-user";
import { IUser } from "@/@types/IUser";
import { useState } from "react";
import { usersList } from "./../../../../mocks/users-list";
import { ButtonGeneral } from "@/components/ui/button/button-general";
import { ModalBackground } from "@/components/modal/modal-background/modal-background";
import { ModalFilterUser } from "./modals/modal-filter-user";
import { useFilter } from "@/hooks/useFilter";
import { toast } from "sonner";
import dayjs from "dayjs";

export function Users() {
  const {
    searchName,
    setSearchName,
    selectedDateRegister,
    setSelectedDateRegister,
  } = useFilter();
  const [users, setUsers] = useState<IUser[]>(usersList);
  const [isOpenModalFilter, setIsOpenModalFilter] = useState<boolean>(false);

  const applyFilters = async () => {
    try {
      const filtered = users.filter((user) => {
        const matchesName = user.name
          .toLowerCase()
          .includes(searchName.toLowerCase());

        const matchesDate =
          !selectedDateRegister ||
          dayjs(user.created_at, "DD/MM/YYYY").isBefore(
            dayjs(selectedDateRegister, "DD/MM/YYYY"),
            "day"
          ) ||
          dayjs(user.created_at, "DD/MM/YYYY").isSame(
            dayjs(selectedDateRegister, "DD/MM/YYYY"),
            "day"
          );

        console.log("matchesDate", matchesDate);
        return matchesName && matchesDate;
      });

      setUsers(filtered);
    } catch (error) {
      toast.error("Erro ao buscar usuários");
    }
  };

  const clearFields = () => {
    setSearchName("");
    setSelectedDateRegister("");
    setUsers(usersList);
  };

  const handleDeleteUser = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <section className="h-screen">
      <TitlePage title="Usuários" />

      <article className="flex justify-between">
        <ButtonGeneral
          text="Filtros"
          onClick={() => setIsOpenModalFilter(true)}
          className="bg-blue-800 text-background-dark w-40 hover:bg-blue-500 "
        />
      </article>

      <TableUser data={users} onDeleteUser={handleDeleteUser} />

      {isOpenModalFilter && (
        <ModalBackground>
          <ModalFilterUser
            onApplyFilters={applyFilters}
            onClearFields={clearFields}
            onClose={() => setIsOpenModalFilter(false)}
          />
        </ModalBackground>
      )}
    </section>
  );
}
