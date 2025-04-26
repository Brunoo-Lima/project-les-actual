"use client";

import { IReplacement } from "@/@types/IReplacement";
import {
  getListReplacementsStatus,
  updateReplacement,
} from "@/services/return-product";
import { FormatValue } from "@/utils/format-value";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function ListReplacementRequest() {
  const [replacements, setReplacements] = useState<IReplacement[]>([]);

  useEffect(() => {
    const fetchOrdersReplacement = async () => {
      const ordersReplacement = await getListReplacementsStatus(
        "DEVOLUCAO_EM_ANDAMENTO"
      );
      setReplacements(ordersReplacement);
    };

    fetchOrdersReplacement();
  }, []);

  const handleReturnedOrderExchange = async (id: string) => {
    if (!id) {
      toast.error("ID inválido para a devolução");
      return;
    }

    try {
      await updateReplacement(id, "PEDIDO_DEVOLVIDO");
      toast.success("Pedido devolvido!");
    } catch (error) {
      console.error("Erro detalhado:", error);

      toast.error("Erro ao confirmar pedido devolvido");
    }
  };

  return (
    <div>
      <table className="w-full">
        <thead className="text-left p-2">
          <tr>
            <th className="w-1/5">Id do pedido</th>
            <th className="w-1/5">Data do pedido</th>
            <th className="w-1/5">Valor do pedido</th>
            <th className="w-1/5">Quantidade de itens</th>
            <th className="w-1/6 pl-4">Status do pedido</th>
          </tr>
        </thead>

        <tbody>
          {replacements.map((replacement: IReplacement) => {
            const parsedItems = JSON.parse(replacement.items); // transforma string em array de objetos
            const totalQuantity = parsedItems.reduce(
              (acc: number, item: { quantity: number }) => acc + item.quantity,
              0
            );

            const totalOrder = parsedItems.reduce(
              (acc: number, item: { quantity: number; price: number }) =>
                acc + item.quantity * item.price,
              0
            );

            return (
              <tr key={replacement.id} className="border-b border-gray-500 h-9">
                <td>{replacement.id}</td>
                <td>{replacement.createdAt}</td>
                <td>{FormatValue(totalOrder)}</td>
                <td>{totalQuantity}</td>
                <td className="flex gap-2 ml-2 items-center">
                  {replacement.status === "DEVOLUCAO_EM_ANDAMENTO" && (
                    <p>Devolução em andamento</p>
                  )}

                  <button
                    type="button"
                    onClick={() => handleReturnedOrderExchange(replacement.id)}
                    className="size-7 flex-shrink-0 rounded-full bg-green-500 p-1 flex items-center justify-center"
                  >
                    <CheckIcon size={16} color="#ffffff" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
