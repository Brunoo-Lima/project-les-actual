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
  statusOrder: boolean;
  statusProgress?: string;
}

export function ButtonsActions({
  item,
  statusOrder,
  status,
  onOpenModalForExchange,
  statusProgress,
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

  return (
    <div className="flex flex-col gap-2 z-2 mt-1">
      <button
        type="submit"
        disabled={status.toUpperCase() === "ENTREGUE" ? true : false}
        className={`p-1 rounded-md ${
          status.toUpperCase() === "ENTREGUE"
            ? "bg-blue-500/70 cursor-not-allowed"
            : "bg-blue-500 cursor-pointer hover:bg-blue-600 transition duration-300"
        }`}
        onClick={handleChangeStatusOrder}
      >
        {status.toUpperCase() === "ENTREGUE"
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

      {/* {statusOrder ? (

      ): ()} */}

      {statusOrder ? (
        <p className="text-yellow-600">
          <strong>{statusProgress?.replaceAll("_", " ")}</strong>
        </p>
      ) : status.toUpperCase() === "ENTREGUE" ? (
        <button
          type="button"
          className="bg-orange-500 p-1 rounded-md hover:bg-orange-600 transition"
          onClick={() => onOpenModalForExchange("all", item)}
        >
          Solicitar devolução
        </button>
      ) : null}

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
