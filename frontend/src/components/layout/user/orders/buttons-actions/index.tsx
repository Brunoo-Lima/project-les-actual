import { updateStatusOrder } from "@/services/order";
import { toast } from "sonner";
import { IOrderRequest } from "../orders";

interface IButtonsActionsProps {
  item: IOrderRequest;
  status: string;
  onOpenModalForExchange: (item: string, order: IOrderRequest) => void;
}

export function ButtonsActions({
  item,
  // coupon,
  status,
  onOpenModalForExchange,
}: IButtonsActionsProps) {
  const handleChangeStatusOrder = async () => {
    try {
      const changeStatus = await updateStatusOrder(item.id, "ENTREGUE");

      if (changeStatus) {
        toast.success("Entrega confirmada com sucesso!");
      }
    } catch (error) {
      toast.error("Erro ao tentar confirmar entrega do pedido");
    }
  };

  const hasExchange = status === "AGUARDANDO_APROVACAO";

  return (
    <div className="flex flex-col gap-2 z-2 mt-1">
      <button
        type="submit"
        disabled={status === "ENTREGUE" ? true : false}
        className={`p-1 rounded-md ${
          status === "ENTREGUE"
            ? "bg-blue-500/70 cursor-not-allowed"
            : "bg-blue-500 cursor-pointer hover:bg-blue-600 transition duration-300"
        }`}
        onClick={handleChangeStatusOrder}
      >
        {status.toLowerCase() === "Entregue".toLowerCase()
          ? "Pedido entregue"
          : "Confirmar entrega"}
      </button>
      <button type="button" className="bg-error p-1 rounded-md">
        Cancelar pedido
      </button>

      {/* {coupon ? (
        <p>Cupom Disponível: {coupon}</p>
      ) : status === "TROCA SOLICITADA" ? (
        <p>TROCA SOLICITADA</p>
      ) : ( */}

      {status.toLowerCase() === "Entregue".toLowerCase() && (
        <button
          type="button"
          className="bg-orange-500 p-1 rounded-md hover:bg-orange-600 transition"
          onClick={() => onOpenModalForExchange("all", item)}
        >
          {/* {status ? "AGUARDANDO APROVACAO" : "Solicitar troca"} */}
          Solicitar devolução
        </button>
      )}

      {/* <button
        type="button"
        onClick={() => onOpenModalForExchange(item.id, item)}
        className="underline text-orange-400"
      >
        Solicitar troca
      </button> */}

      {/* )} */}
    </div>
  );
}
