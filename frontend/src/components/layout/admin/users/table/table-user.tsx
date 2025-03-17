import { JSX, useState } from "react";
import { IUser } from "@/@types/IUser";
import { TableRow } from "./table-row";
import { toast } from "sonner";
import { ModalStatusUser } from "../modals/modal-status-user";
import { ModalInfoUser } from "../modals/modal-info-user";
import { detailClient } from "@/services/client";
import { useRouter } from "next/navigation";

interface ITableUserProps {
  data: IUser[];
  onDeleteUser: (id: string) => void;
}

type ModalType = "info" | "status" | null;

export function TableUser({ data, onDeleteUser }: ITableUserProps) {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);
  const router = useRouter();

  const handleDeleteUser = (
    user: IUser,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    onDeleteUser(user.id);
    toast.success("Usuário deletado com sucesso!");
  };

  const handleEditUser = async (
    user: IUser,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();

    try {
      router.push(`/editar/${user.id}`);
    } catch (error) {
      toast.error("Erro ao buscar dados do cliente");
    }
  };

  const handleOpenModalInfoUser = async (
    user: IUser,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setModalType("info");
    try {
      const data = await detailClient(user.id);

      setSelectedUser(data);
    } catch (error) {
      toast.error("Erro ao buscar dados do cliente");
    }
  };

  const handleEditStatusUser = (
    user: IUser,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setSelectedUser(user);
    setModalType("status");
  };

  const modalComponent: Record<Exclude<ModalType, null>, JSX.Element> = {
    status: (
      <ModalStatusUser onClose={() => setModalType(null)} user={selectedUser} />
    ),

    info: (
      <ModalInfoUser onClose={() => setModalType(null)} user={selectedUser} />
    ),
  };

  return (
    <div className="w-full">
      {data.length > 0 ? (
        <table className="table-fixed w-full border-separate border-spacing-y-5">
          <thead className="text-left p-2">
            <tr>
              <th className="w-1/6 pl-2">Id</th>
              <th className="w-1/5">Usuário</th>
              <th className="w-1/5">Email</th>
              <th className="w-1/5">Cadastrado</th>
              <th className="w-1/5">Pedidos</th>
              <th className="w-1/5">Status</th>
              <th className="w-1/12 pl-4">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => (
              <TableRow
                key={user.id}
                user={user}
                onOpenDetailsUser={handleOpenModalInfoUser}
                onDeleteUser={handleDeleteUser}
                onEditStatusUser={handleEditStatusUser}
                onEditUser={handleEditUser}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-primary-light text-base font-normal mt-6">
          Não há clientes
        </p>
      )}

      {modalType && modalComponent[modalType]}
    </div>
  );
}
