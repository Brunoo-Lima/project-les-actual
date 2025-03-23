import { IProduct } from "@/@types/IProduct";

interface IButtonsActionsProps {
  item: Pick<IProduct, "isAvailable">;
  coupon: string | null;
  status: string;
  onOpenModalForExchange: (item: string) => void;
}

export function ButtonsActions({
  item,
  coupon,
  onOpenModalForExchange,
  status,
}: IButtonsActionsProps) {
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

      {coupon ? (
        <p>Cupom Disponível: {coupon}</p>
      ) : status === "TROCA SOLICITADA" ? (
        <p>TROCA SOLICITADA</p>
      ) : (
        <button
          type="button"
          onClick={() => onOpenModalForExchange(item)}
          className="underline text-orange-400"
        >
          Solicitar troca
        </button>
      )}
    </div>
  );
}
