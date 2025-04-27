import { updateStatusOrder } from "@/services/order";
import { toast } from "sonner";
import { IOrderRequest } from "../orders";
import { useEffect, useState } from "react";
import { getListReplacements } from "@/services/return-product";
import { IReplacement } from "@/@types/IReplacement";

interface IButtonsActionsProps {
  item: IOrderRequest;
  status: string;
  onOpenModalForExchange: (item: string, order: IOrderRequest) => void;
  hasRequest: boolean;
  requestStatus?: string;
}

export function ButtonsActions({
  item,
  hasRequest,
  requestStatus,
  status,
  onOpenModalForExchange,
}: IButtonsActionsProps) {
  const statusOrderDisabledButton =
    status.toUpperCase() === "ENTREGUE" ||
    status.toUpperCase() === "AGUARDANDO_APROVACAO";

  const disabledButtonCancelOrder =
    status.toUpperCase() === "ENTREGUE" ||
    status.toUpperCase() === "EM_TRANSPORTE";

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

  return (
    <div className="flex flex-col gap-2 z-2 mt-1">
      <button
        type="submit"
        disabled={statusOrderDisabledButton}
        className={`p-1 rounded-md ${
          statusOrderDisabledButton
            ? "bg-blue-500/70 cursor-not-allowed"
            : "bg-blue-500 cursor-pointer hover:bg-blue-600 transition duration-300"
        }`}
        onClick={handleChangeStatusOrder}
      >
        {status.toUpperCase() === "ENTREGUE"
          ? "Pedido entregue"
          : "Confirmar entrega"}
      </button>
      <button
        type="button"
        className={`bg-error p-1 rounded-md ${
          disabledButtonCancelOrder ? "cursor-not-allowed" : "cursor-pointer"
        }`}
        disabled={disabledButtonCancelOrder}
      >
        Cancelar pedido
      </button>

      {hasRequest ? (
        <p className="text-base font-semibold mt-1">
          Status da Solicitação:{" "}
          <span
            className={`
              ${requestStatus === "DEVOLUCAO_ACEITA" ? "text-blue-400" : ""}
              ${requestStatus === "TROCA_SOLICITADA" ? "text-orange-400" : ""}
              ${requestStatus === "DEVOLUCAO_CONCLUIDA" ? "text-success" : ""}
              ${requestStatus === "TROCA_RECUSADA" ? "text-red-400" : ""}
            `}
          >
            {requestStatus?.replaceAll("_", " ")}
          </span>
        </p>
      ) : (
        /* Botão de solicitar troca/devolução (apenas se o pedido estiver "ENTREGUE" e não houver solicitação) */
        status.toUpperCase() === "ENTREGUE" && (
          <button
            type="button"
            className="bg-orange-500 p-1 rounded-md hover:bg-orange-600 transition"
            onClick={() => onOpenModalForExchange("all", item)}
          >
            Solicitar troca/devolução
          </button>
        )
      )}
    </div>
  );
}
