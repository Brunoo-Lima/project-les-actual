import { IUser } from '@/@types/IUser';
import { TableRow } from './table-row';
import { useState } from 'react';
import { toast } from 'sonner';

interface ITableUserProps {
  data: IUser[];
  onDeleteUser: (user: number) => void;
}

export function TableUser({ data, onDeleteUser }: ITableUserProps) {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [openModalInfoUser, setOpenModalInfoUser] = useState<boolean>(false);

  const handleDeleteUser = (
    user: IUser,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    onDeleteUser(user.id);
    toast.success('Usuário deletado com sucesso!');
  };

  const handleOpenModalInfoUser = (user: IUser) => {
    setSelectedUser(user);
    setOpenModalInfoUser(true);
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
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-primary-light text-base font-normal mt-6">
          Não há usuários
        </p>
      )}
    </div>
  );
}
