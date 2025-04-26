"use client";

import { IReplacement } from "@/@types/IReplacement";
import {
  getListReplacements,
  updateReplacement,
} from "@/services/return-product";
import { FormatValue } from "@/utils/format-value";
import { CheckIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function ListReplacement() {
  const [replacements, setReplacements] = useState<IReplacement[]>([]);

  useEffect(() => {
    const fetchOrdersReplacement = async () => {
      const ordersReplacement = await getListReplacements();
      setReplacements(ordersReplacement);
    };

    fetchOrdersReplacement();
  }, []);

  const handleAcceptOrderExchange = async (id: string) => {
    if (!id) {
      toast.error("ID inválido para a troca");
      return;
    }

    try {
      await updateReplacement(id, "DEVOLUCAO_EM_ANDAMENTO");

      toast.success("Pedido de troca aprovado!");
    } catch (error) {
      console.error("Erro detalhado:", error);

      toast.error("Erro ao aprovar pedido de troca");
    }
  };

  const handleRefusedOrderExchange = async (id: string) => {
    try {
      await updateReplacement(id, "TROCA_RECUSADA");
      toast.success("Pedido de troca recusado!");
    } catch (error) {
      toast.error("Erro ao reprovar pedido de troca");
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
            <th className="w-1/12 pl-4">Ações</th>
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
                  <button
                    type="button"
                    onClick={() => handleAcceptOrderExchange(replacement.id)}
                    className="size-7 rounded-full bg-green-500 p-1 flex items-center justify-center"
                  >
                    <CheckIcon size={16} color="#ffffff" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRefusedOrderExchange(replacement.id)}
                    className="size-7 rounded-full bg-error p-1 flex items-center justify-center"
                  >
                    <XIcon size={16} color="#ffffff" />
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
