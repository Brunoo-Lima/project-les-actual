import { IUser } from "@/@types/IUser";
import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";

interface ITableRowProps {
  user: IUser;
  onOpenDetailsUser: (user: IUser) => void;
  onDeleteUser: (
    user: IUser,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  onEditStatusUser: (
    user: IUser,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function TableRow({
  user,
  onOpenDetailsUser,
  onDeleteUser,
  onEditStatusUser,
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
        <p
          className={`${
            user.status === "Ativo" ? "bg-green-500" : "bg-red-500"
          } w-24 px-2 text-center rounded-sm border-none flex items-center justify-center gap-x-2`}
        >
          {user.status}
        </p>
      </td>

      <td>
        <div className="flex items-center gap-x-4">
          <button type="button" onClick={() => onOpenDetailsUser(user)}>
            <EyeIcon size={20} color="#ffffff" />
          </button>

          <button type="button" onClick={(e) => onEditStatusUser(user, e)}>
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
