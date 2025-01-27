import { EyeIcon, PencilIcon, Trash2Icon } from 'lucide-react';

interface ITableRowProps {
  product: any;
}

export function TableRow({ product }: ITableRowProps) {
  return (
    <tr
      className="rounded-lg bg-background-dark h-14 text-left hover:brightness-110 cursor-pointer"
      // onClick={() => onOpenDetailsClient(client)}
    >
      <td className="pl-2">{product.id}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>
        <button
          type="button"
          // onClick={(event) => onEditStatusClient(client, event)}
          className={`${
            product.status === 'Ativo' ? 'bg-green-500' : 'bg-red-500'
          } w-24 px-2 text-center rounded-sm border-none flex items-center justify-center gap-x-2`}
        >
          <p className="font-semibold text-base">{product.status}</p>

          <PencilIcon size={16} color="#ffffff" />
        </button>
      </td>

      <td>{product.stock}</td>

      <td>
        <div className="flex items-center gap-x-4">
          <button
            type="button"
            // onClick={() => onOpenDetailsClient(client)}
          >
            <EyeIcon size={20} color="#ffffff" />
          </button>

          <button
            type="button"
            // onClick={(event) => onEditClient(client, event)}
          >
            <PencilIcon size={20} color="#ffffff" />
          </button>

          <button
            type="button"
            // onClick={onDeleteClient}
          >
            <Trash2Icon size={20} color="#ffffff" />
          </button>
        </div>
      </td>
    </tr>
  );
}
