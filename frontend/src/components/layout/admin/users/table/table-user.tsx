import { JSX, useState } from "react";
import { IUser } from "@/@types/IUser";
import { TableRow } from "./table-row";
import { toast } from "sonner";
import { ModalStatusUser } from "../modals/modal-status-user";
import { ModalInfoUser } from "../modals/modal-info-user";

interface ITableUserProps {
  data: IUser[];
  onDeleteUser: (user: number) => void;
}

type ModalType = "info" | "status" | null;

export function TableUser({ data, onDeleteUser }: ITableUserProps) {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [modalType, setModalType] = useState<ModalType>(null);

  const handleDeleteUser = (
    user: IUser,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    onDeleteUser(user.id);
    toast.success("Usuário deletado com sucesso!");
  };

  const handleOpenModalInfoUser = (user: IUser) => {
    setSelectedUser(user);
    setModalType("info");
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
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-primary-light text-base font-normal mt-6">
          Não há usuários
        </p>
      )}

      {modalType && modalComponent[modalType]}
    </div>
  );
}
