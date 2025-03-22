"use client";

import { ModalBackground } from "@/components/modal/modal-background/modal-background";
import { useCheckout } from "@/hooks/useCheckout";
import { FormatValue } from "@/utils/format-value";
import { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { redirect } from "next/navigation";
import ModalDetailsOrder from "../shopping-cart/modal-details-order";
import { CardOrder } from "./card-order";
import { ordersFinishedList } from "./../../../../mocks/orders-finished-list";
import { ButtonsActions } from "./buttons-actions";
import { ModalExchange } from "./modal/modal-exchange";

export function Orders() {
  const { order, setOrder } = useCheckout();
  const [orders, setOrders] = useState(ordersFinishedList);
  const [isOpenDetails, setIsOpenDetails] = useState<boolean>(false);
  const [chooseItemForExchange, setChooseItemExchange] = useState("");
  const [isOpenModalItemForExchange, setIsOpenModalItemForExchange] =
    useState<boolean>(false);

  //Ta dando b.o na hora de adiiconar um novo pedido, precisa ser melhorado quando implementar o backend

  useEffect(() => {
    if (order && order.items.length > 0) {
      const orderExists = orders.some((order: any) => order.id === order.id);

      if (!orderExists) {
        const newOrder = {
          id: Math.ceil(Math.random() * 1000).toString(),
          status: order.status || "Finalizado",
          created_at: new Date().toLocaleDateString("pt-BR"),
          updated_at: new Date().toLocaleDateString("pt-BR"),
          items: order.items,
          address: order.address,
          payment: order.payment,
          freight: order.freight,
          coupon: order.coupon,
          discountValue: order.discountValue,
          total: order.total,
        };

        setOrders((prevOrders) => [newOrder, ...prevOrders] as any);

        setOrder({
          items: [],
          total: 0,
          address: null,
          payment: [],
          status: "Pendente",
          freight: 20,
          coupon: null,
          discountValue: 0,
        });
      }
    }
  }, [order]);

  // console.log('order', order);
  // console.log('ordersss', orders);

  const handleOpenModalItemForExchange = (item: string) => {
    setChooseItemExchange(item);
    setIsOpenModalItemForExchange(true);
  };

  if (!orders) return redirect("/produtos");

  return (
    <section className="flex items-center flex-col gap-y-4 py-4 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Pedidos!</h1>

      {orders.length > 0 ? (
        orders.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-[1fr_200px] place-items-center gap-6 bg-background-dark rounded-md p-4 w-[650px] h-max min-h-[250px]"
          >
            <div className="flex flex-col gap-y-4 w-full h-[250px] overflow-auto relative z-1 container-address-form">
              {item.items.map((product) => (
                <CardOrder
                  key={`${item.id}-${product.id}`}
                  item={product as any}
                />
              ))}
            </div>

            <div className="flex flex-col relative h-full">
              <div
                className="flex items-center gap-2 cursor-pointer transition duration-300 *:hover:text-primary-light relative"
                onClick={() => setIsOpenDetails(true)}
              >
                <p className="">Ver detalhes do pedido</p>
                {isOpenDetails === true ? (
                  <ChevronUpIcon
                    size={20}
                    onClick={() => setIsOpenDetails(false)}
                  />
                ) : (
                  <ChevronDownIcon
                    size={20}
                    onClick={() => setIsOpenDetails(true)}
                  />
                )}
              </div>

              <p className="text-base font-semibold mt-1">
                Status:{" "}
                <span
                  className={`${
                    item.status === "Finalizado"
                      ? "text-success"
                      : "text-yellow-400"
                  }`}
                >
                  {item.status}
                </span>
              </p>

              <p className="text-base font-semibold mt-1">
                Pedido: {item.delivery}
              </p>

              <ButtonsActions
                item={item as any}
                onOpenModalForExchange={handleOpenModalItemForExchange}
              />

              <div className="absolute bottom-0 left-0">
                <p>Total do pedido:</p>
                <span className="font-bold text-xl">
                  {FormatValue(item.total || 0)}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Não há pedidos para exibir!</p>
      )}

      {isOpenDetails && (
        <ModalBackground>
          <ModalDetailsOrder
            order={order}
            onClose={() => setIsOpenDetails(false)}
          />
        </ModalBackground>
      )}

      {isOpenModalItemForExchange && (
        <ModalBackground>
          <ModalExchange
            order={order}
            onClose={() => setIsOpenModalItemForExchange(false)}
            chooseItem={chooseItemForExchange}
          />
        </ModalBackground>
      )}
    </section>
  );
}
