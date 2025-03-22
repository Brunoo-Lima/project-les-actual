import { Trash2Icon } from "lucide-react";
import { ButtonsQuantity } from "./buttons-quantity/buttons-quantity";
import { ICartItem } from "@/@types/IOrder";

interface IItemCartProps {
  item: ICartItem;
  handleIncrement: (id: string) => void;
  handleDecrement: (id: string) => void;
  handleRemoveItem: (id: string) => void;
}

export function ItemCart({
  item,
  handleDecrement,
  handleIncrement,
  handleRemoveItem,
}: IItemCartProps) {
  return (
    <div
      key={item.id}
      className="flex gap-4 justify-between bg-background-dark py-2 px-3 rounded-md"
    >
      <div className="flex flex-col gap-2 flex-1">
        <p className="text-lg font-semibold">{item.name}</p>
        <small className="italic">R$ {item.price}</small>
      </div>

      <div className="flex flex-col items-start gap-4">
        <ButtonsQuantity
          quantity={item.quantity}
          handleIncrement={() => handleIncrement(item.id)}
          handleDecrement={() => handleDecrement(item.id)}
        />

        <button
          type="button"
          onClick={() => handleRemoveItem(item.id)}
          className="w-max flex items-center gap-2 self-center bg-background px-2 rounded-md text-sm transition duration-300 hover:bg-gray-800"
        >
          <Trash2Icon size={12} color="#ffffff" />
          Remover
        </button>
      </div>

      <div className="w-24 text-right">
        <p className="text-lg font-semibold">R$ {item.quantity * item.price}</p>
      </div>
    </div>
  );
}
