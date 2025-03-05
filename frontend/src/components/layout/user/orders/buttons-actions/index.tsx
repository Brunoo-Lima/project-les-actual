import { IProduct } from "@/@types/IProduct";

interface IButtonsActionsProps {
  item: Pick<IProduct, "isAvailable">;
}

export function ButtonsActions({ item }: IButtonsActionsProps) {
  return (
    <div className="flex flex-col gap-2 z-2 mt-1">
      <button
        type="button"
        disabled={item.isAvailable ? true : false}
        className={`p-1 rounded-md ${
          item.isAvailable ? "bg-blue-500/70 cursor-not-allowed" : "bg-blue-500"
        }`}
      >
        Pedido entregue
      </button>
      <button type="button" className="bg-error p-1 rounded-md">
        Cancelar pedido
      </button>
      <button type="button" className="underline text-orange-400">
        Solicitar troca
      </button>
    </div>
  );
}
