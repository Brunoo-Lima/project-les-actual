"use client";

import { IReplacement } from "@/@types/IReplacement";
import { getListReplacementsStatus } from "@/services/replacement";
import { FormatValue } from "@/utils/format-value";
import { useEffect, useState } from "react";

//TODO: Nao ta gerando o cupom ainda
export function ListReplacementReturned() {
  const [replacements, setReplacements] = useState<IReplacement[]>([]);

  useEffect(() => {
    const fetchOrdersReplacement = async () => {
      const ordersReplacement = await getListReplacementsStatus(
        "PEDIDO_DEVOLVIDO"
      );
      setReplacements(ordersReplacement);
    };

    fetchOrdersReplacement();
  }, []);

  return (
    <div>
      <table className="w-full">
        <thead className="text-left p-2">
          <tr>
            <th className="w-1/5">Id do pedido</th>
            <th className="w-1/5">Data do pedido</th>
            <th className="w-1/5">Valor do pedido</th>
            <th className="w-1/5">Quantidade de itens</th>
            <th className="w-1/12 pl-4">Status do pedido</th>
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
                  {replacement.status === "PEDIDO_DEVOLVIDO" && (
                    <p>Produto Devolvido</p>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
