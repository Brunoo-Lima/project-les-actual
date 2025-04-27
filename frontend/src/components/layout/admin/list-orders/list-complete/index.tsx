"use client";

import { listOrdersWithoutUserId } from "@/services/order";
import { FormatValue } from "@/utils/format-value";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function ListComplete() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const ordersData = await listOrdersWithoutUserId("ENTREGUE");
      setOrders(ordersData);
    } catch (error) {
      toast.error("Algo deu errado na requisição");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <table className="w-full">
        <thead className="text-left p-2">
          <tr>
            <th className="w-1/5">Id do pedido</th>
            <th className="w-1/5">Data do pedido</th>
            <th className="w-1/5">Valor do pedido</th>
            <th className="w-40">Quantidade de itens</th>
            <th className="w-40">Pagamento</th>
            <th className="w-40">Status do pedido</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order: any) => {
            const lastPaymentStatus =
              order.payments?.[order.payments.length - 1]?.status;

            const statusFormatted =
              lastPaymentStatus === "completed" ? "APROVADO" : "";

            return (
              <tr key={order.id} className="border-b border-gray-500 h-9">
                <td>{order.id}</td>
                <td>{new Date(order.created_at).toLocaleDateString()}</td>
                <td>{FormatValue(order.total)}</td>
                <td>{order.items.length}</td>
                <td>
                  <p
                    className={`w-max px-2 py-1 rounded-md ${
                      statusFormatted === "APROVADO" ? "bg-green-500" : ""
                    } `}
                  >
                    {statusFormatted || "Sem pagamento"}
                  </p>
                </td>

                <td className="flex items-center gap-2">
                  <p>{order.status}</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
