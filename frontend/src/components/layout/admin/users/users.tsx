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
import { deleteClient } from "@/services/client";

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

  const applyFilters = async () => {
    try {
      const filtered = users.filter((user) => {
        const matchesName = user.name
          .toLowerCase()
          .includes(searchName.toLowerCase());

        const matchesStatus =
          !selectedStatus || user.status
            ? "Ativo"
            : "Inativo" === selectedStatus.value;

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
        return matchesName && matchesDate && matchesStatus;
      });

      setUsers(filtered);
    } catch (error) {
      toast.error("Erro ao buscar usuários");
    }
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

  if (!users.length) return;

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
        <p>Não há clientes!</p>
      )}

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
