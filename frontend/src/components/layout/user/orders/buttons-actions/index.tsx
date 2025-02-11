import { IProduct } from "@/@types/IProduct";

interface IButtonsActionsProps {
  item: Pick<IProduct, "delivery">;
}

export function ButtonsActions({ item }: IButtonsActionsProps) {
  return (
    <div className="flex flex-col gap-2 z-2 mt-1">
      <button
        type="button"
        disabled={item.delivery === "Entregue"}
        className={`p-1 rounded-md ${
          item.delivery === "Entregue"
            ? "bg-blue-500/70 cursor-not-allowed"
            : "bg-blue-500"
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
