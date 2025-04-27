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

      const result = await updateReplacement(id, "PEDIDO_DEVOLVIDO");
      console.log("Resultado da atualização:", result); // Log adicional

      setReplacements((prev) => prev.filter((item) => item.id !== id));
      toast.success(result.message || "Pedido devolvido com sucesso!");
    } catch (error: any) {
      console.error("Erro detalhado:", error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Erro ao processar devolução"
      );

      // console.error("Erro detalhado:", error);

      // toast.error("Erro ao confirmar pedido devolvido");
    }
  };

  return (
    <div>
      <table className="w-full">
        <thead className="text-left p-2">
          <tr>
            <th className="w-1/6">Id do pedido</th>
            <th className="w-1/6">Data do pedido</th>
            <th className="w-1/6">Valor do pedido</th>
            <th className="w-1/6">Quantidade de itens</th>
            <th className="w-1/6">Status</th>
            <th className="w-1/6">Status do pedido</th>
          </tr>
        </thead>

        <tbody>
          {replacements.map((replacement: IReplacement) => {
            const parsedItems = replacement.items
              ? JSON.parse(replacement.items)
              : []; // transforma string em array de objetos
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
                <td>{new Date(replacement.createdAt).toLocaleDateString()}</td>
                <td>{FormatValue(totalOrder)}</td>
                <td>{totalQuantity}</td>
                <td>{replacement.status}</td>
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
