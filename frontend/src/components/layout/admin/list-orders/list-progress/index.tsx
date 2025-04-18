"use client";

import { listOrdersWithoutUserId, updateStatusOrder } from "@/services/order";
import { FormatValue } from "@/utils/format-value";
import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function ListProgress() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const ordersData = await listOrdersWithoutUserId("Transito");
      setOrders(ordersData);
    } catch (error) {
      toast.error("Algo deu errado na requisição");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // const handleChangeStatus = async (orderId: string) => {
  //   try {
  //     const newStatusOrder = await updateStatusOrder(orderId, "Entregue");

  //     if (newStatusOrder) {
  //       toast.success("Pedido entregue com sucesso!");
  //       fetchOrders();
  //     }
  //   } catch (error) {
  //     toast.error("Erro ao tentar aprovar pedido");
  //   }
  // };

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
                <td>{order.created_at}</td>
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

                  {order.status && (
                    <CheckIcon
                      size={16}
                      color="#ffffff"
                      className="rounded-full size-7 bg-primary p-1 cursor-pointer"
                      // onClick={() => handleChangeStatus(order.id)}
                    />
                  )}
                </td>
              </tr>
            );
          })}

          <tr className="border-b border-gray-500 h-9">
            <td>1</td>
            <td>02/03/2025</td>
            <td>R$ 500,00</td>
            <td>1</td>
            <td>
              <p
              // className={`w-max px-2 py-1 rounded-md ${
              //   progress === "EM PROCESSAMENTO" ? "bg-yellow-500" : ""
              // } `}
              >
                EM TROCA
                {/* {progress} */}
              </p>
            </td>

            <td className="flex items-center gap-2">
              {/* <p>{statusOrder}</p> */}
              TROCA AUTORIZADA
              {/* {statusOrder === "EM TRÂNSITO" && (
                <CheckIcon
                  size={16}
                  color="#ffffff"
                  className="rounded-full size-7 bg-primary p-1 cursor-pointer"
                  onClick={() => handleChangeStatus(statusOrder)}
                />
              )} */}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
