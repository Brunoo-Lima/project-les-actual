import { IUser } from "@/@types/IUser";
import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";

interface ITableRowProps {
  user: IUser;
  onOpenDetailsUser: (
    user: IUser,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  onDeleteUser: (
    user: IUser,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  onEditStatusUser: (
    user: IUser,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;

  onEditUser: (user: IUser, event: React.MouseEvent<HTMLButtonElement>) => void;
}

export function TableRow({
  user,
  onOpenDetailsUser,
  onDeleteUser,
  onEditStatusUser,
  onEditUser,
}: ITableRowProps) {
  return (
    <tr className="rounded-lg bg-background-dark h-14 text-left hover:brightness-110 cursor-pointer">
      <td className="pl-2">{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>

      <td>{user.created_at}</td>

      <td>{user.orders?.length || 0}</td>
      <td>
        <button
          type="button"
          className={`${
            user.status ? "bg-green-500" : "bg-red-500"
          } w-24 px-2 text-center rounded-sm border-none flex items-center justify-between gap-x-2`}
          onClick={(e) => onEditStatusUser(user, e)}
        >
          <p>{user.status ? "Ativo" : "Inativo"}</p>
          <PencilIcon size={18} color="#ffffff" />
        </button>
      </td>

      <td>
        <div className="flex items-center gap-x-4">
          <button type="button" onClick={(e) => onOpenDetailsUser(user, e)}>
            <EyeIcon size={20} color="#ffffff" />
          </button>

          <button type="button" onClick={(e) => onEditUser(user, e)}>
            <PencilIcon size={20} color="#ffffff" />
          </button>

          <button type="button" onClick={(e) => onDeleteUser(user, e)}>
            <Trash2Icon size={20} color="#ffffff" />
          </button>
        </div>
      </td>
    </tr>
  );
}
