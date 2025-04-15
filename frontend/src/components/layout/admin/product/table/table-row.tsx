import { IProduct } from "@/@types/IProduct";
import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";

interface ITableRowProps {
  product: IProduct;
  onEditStatusProduct: (
    product: IProduct,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  onOpenDetailsProduct: (product: IProduct) => void;
  onEditProduct: (
    product: IProduct,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
  onDeleteProduct: (
    product: IProduct,
    event: React.MouseEvent<HTMLButtonElement>
  ) => void;
}

export function TableRow({
  product,
  onEditStatusProduct,
  onOpenDetailsProduct,
  onDeleteProduct,
  onEditProduct,
}: ITableRowProps) {
  return (
    <tr
      className="rounded-lg bg-background-dark h-14 text-left hover:brightness-110 cursor-pointer"
      onClick={() => onOpenDetailsProduct(product)}
    >
      <td className="pl-2">{product.id}</td>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>
        <button
          type="button"
          onClick={(event) => onEditStatusProduct(product, event)}
          className={`${
            product.isAvailable ? "bg-green-500" : "bg-red-500"
          } w-24 px-2 text-center rounded-sm border-none flex items-center justify-center gap-x-2`}
        >
          <p className="font-semibold text-base">
            {product.isAvailable ? "Ativo" : "Inativo"}
          </p>

          <PencilIcon size={16} color="#ffffff" />
        </button>
      </td>

      <td>{product.stock.quantity}</td>

      <td>
        <div className="flex items-center gap-x-4">
          <button type="button" onClick={() => onOpenDetailsProduct(product)}>
            <EyeIcon size={20} color="#ffffff" />
          </button>

          <button
            type="button"
            onClick={(event) => onEditProduct(product, event)}
          >
            <PencilIcon size={20} color="#ffffff" />
          </button>

          <button type="button" onClick={(e) => onDeleteProduct(product, e)}>
            <Trash2Icon size={20} color="#ffffff" />
          </button>
        </div>
      </td>
    </tr>
  );
}
