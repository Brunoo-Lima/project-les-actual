"use client";

import { TitlePage } from "@/components/ui/title/title-page/title-page";
import { TableUser } from "./table/table-user";
import { IUser } from "@/@types/IUser";
import { useEffect, useState } from "react";
import { ButtonGeneral } from "@/components/ui/button/button-general";
import { ModalBackground } from "@/components/modal/modal-background/modal-background";
import { ModalFilterUser } from "./modals/modal-filter-user";
import { useFilter } from "@/hooks/useFilter";
import { toast } from "sonner";
import dayjs from "dayjs";
import { getListClient } from "@/services/list-client";
import { deleteClient, useFilterClient } from "@/services/client";

export function Users() {
  const {
    searchName,
    setSearchName,
    selectedDateRegister,
    setSelectedDateRegister,
    selectedStatus,
    setSelectedStatus,
  } = useFilter();
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpenModalFilter, setIsOpenModalFilter] = useState<boolean>(false);

  // const { mutate, data, isError, error } = useFilterClient();

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);

      try {
        const client = await getListClient();

        setUsers(client);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // console.log("clientData", data);

  // useEffect(() => {
  //   if (data) {
  //     setUsers(data);
  //   }
  // }, [data]);

  const applyFilter = () => {
    // const filters: Partial<IUser> = {
    //   name: searchName || undefined,
    //   status:
    //     selectedStatus?.value === "ativo"
    //       ? true
    //       : selectedStatus?.value === "inativo"
    //       ? false
    //       : undefined,
    // };
    // mutate(filters as any);
  };

  const clearFields = () => {
    setSearchName("");
    setSelectedDateRegister("");
    setSelectedStatus(null);
    setUsers(users);
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteClient(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      toast.error("Erro ao deletar");
    }
  };

  if (loading) return <p>Carregando...</p>;

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

      {loading ? (
        <p>Carregando...</p>
      ) : users.length > 0 ? (
        <TableUser data={users} onDeleteUser={handleDeleteUser} />
      ) : (
        <p className="mt-6">Não há clientes!</p>
      )}

      {isOpenModalFilter && (
        <ModalBackground>
          <ModalFilterUser
            onApplyFilters={applyFilter}
            onClearFields={clearFields}
            onClose={() => setIsOpenModalFilter(false)}
          />
        </ModalBackground>
      )}
    </section>
  );
}
