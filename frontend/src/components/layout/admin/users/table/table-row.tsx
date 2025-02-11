import { IUser } from '@/@types/IUser';
import { EyeIcon, Trash2Icon } from 'lucide-react';

interface ITableRowProps {
  user: IUser;
  onOpenDetailsUser: (user: IUser) => void;
  onDeleteUser: (
    user: IUser,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function TableRow({
  user,
  onOpenDetailsUser,
  onDeleteUser,
}: ITableRowProps) {
  return (
    <tr
      className="rounded-lg bg-background-dark h-14 text-left hover:brightness-110 cursor-pointer"
      onClick={() => onOpenDetailsUser(user)}
    >
      <td className="pl-2">{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>

      <td>{user.created_at}</td>

      <td>{user.orders.length}</td>

      <td>
        <div className="flex items-center gap-x-4">
          <button type="button" onClick={() => onOpenDetailsUser(user)}>
            <EyeIcon size={20} color="#ffffff" />
          </button>

          <button type="button" onClick={(e) => onDeleteUser(user, e)}>
            <Trash2Icon size={20} color="#ffffff" />
          </button>
        </div>
      </td>
    </tr>
  );
}
