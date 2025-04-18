"use client";

import { updateStatusOrder, listOrdersWithoutUserId } from "@/services/order";
import { FormatValue } from "@/utils/format-value";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Payment = "AGUARDANDO PAGAMENTO" | "PAGAMENTO APROVADO";

export function ListWaitingApproval() {
  const [orders, setOrders] = useState([]);
  const [payment, setPayment] = useState<Payment>("AGUARDANDO PAGAMENTO");

  useEffect(() => {
    const paymentChange = setTimeout(() => {
      setPayment("PAGAMENTO APROVADO");
    }, 5000);

    return () => {
      clearTimeout(paymentChange);
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const ordersData = await listOrdersWithoutUserId("Pendente");
      setOrders(ordersData);
    } catch (error) {
      toast.error("Algo deu errado na requisição");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChangeStatus = async (orderId: string) => {
    try {
      const newStatusOrder = await updateStatusOrder(orderId, "Aprovado");

      if (newStatusOrder) {
        toast.success("Pedido aprovado com sucesso!");
        fetchOrders();
      }
    } catch (error) {
      toast.error("Erro ao tentar aprovar pedido");
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
            <th className="w-40">Quantidade de itens</th>
            <th className="w-40">Pagamento</th>
            <th className="w-40">Status do pedido</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order: any) => (
            <tr key={order.id} className="border-b border-gray-500 h-9">
              <td>{order.id}</td>
              <td>{order.created_at}</td>
              <td>{FormatValue(order.total)}</td>
              <td>{order.items.length}</td>
              <td>
                <p
                  className={`w-max px-2 py-1 rounded-md ${
                    payment === "AGUARDANDO PAGAMENTO"
                      ? "bg-yellow-500"
                      : "bg-primary"
                  } `}
                >
                  {payment}
                </p>
              </td>

              <td className="flex items-center gap-2">
                <p className="w-max px-2 py-1 rounded-md">{order.status}</p>

                {order.status === "Pendente" && (
                  <CheckIcon
                    size={16}
                    color="#ffffff"
                    className="rounded-full size-7 bg-primary p-1 cursor-pointer"
                    onClick={() => handleChangeStatus(order.id)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
