"use client";

import { ModalBackground } from "@/components/modal/modal-background/modal-background";
import { useCheckout } from "@/hooks/useCheckout";
import { FormatValue } from "@/utils/format-value";
import { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { redirect } from "next/navigation";
import ModalDetailsOrder from "./modal/modal-details-order";
import { CardOrder } from "./card-order";
import { ordersFinishedList } from "./../../../../mocks/orders-finished-list";
import { ButtonsActions } from "./buttons-actions";
import { ModalExchange } from "./modal/modal-exchange";
import { listOrders } from "@/services/order";
import { useUseAuth } from "@/hooks/useAuth";
import { IAddress } from "@/@types/IAddress";
import { toast } from "sonner";

interface IOrderRequest {
  id: string;
  total: number;
  status: string;
  freight: number;
  discountValue?: number;
  address?: IAddress;
  items: {
    id: string;
    quantity: number;
    price: number;
    productId: string;
    orderId: string;
    product: {
      name: string;
      image: string;
    };
  }[];

  // payments: IOrderPayment[];
}

export function Orders() {
  const { user, isAuthenticated, isLoading: isAuthLoading } = useUseAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState<IOrderRequest[]>([]);
  const [isOpenDetails, setIsOpenDetails] = useState<boolean>(false);
  const [chooseItemForExchange, setChooseItemExchange] = useState("");
  const [isOpenModalItemForExchange, setIsOpenModalItemForExchange] =
    useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrderRequest | null>(
    null
  );

  console.log("initial orders", orders);
  console.log("user", user);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const dataOrder = await listOrders(user.id);
      setOrders(dataOrder || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("Falha ao carregar pedidos");
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [user.id, isAuthenticated]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (isAuthenticated && user.id) {
  //       fetchOrders();
  //     }
  //   }, 1800000);

  //   return () => clearInterval(interval);
  // }, [isAuthenticated, user.id]);

  console.log("orders", orders);

  const handleOpenModalItemForExchange = (
    item: string,
    order: IOrderRequest
  ) => {
    setChooseItemExchange(item);
    setSelectedOrder(order);
    setIsOpenModalItemForExchange(true);
  };

  const handleOpenDetails = (order: IOrderRequest) => {
    setSelectedOrder(order);
    setIsOpenDetails(true);
  };

  if (isLoading) {
    return (
      <section className="flex items-center flex-col gap-y-4 py-4 min-h-screen h-screen">
        <p className="text-base font-semibold mb-4">Carregando pedidos...</p>
      </section>
    );
  }

  return (
    <section className="flex items-center flex-col gap-y-4 pt-4 mb-8 min-h-screen h-screen">
      <h1 className="text-2xl font-semibold mb-4">Pedidos!</h1>

      {orders.length > 0 ? (
        orders
          .map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[1fr_220px] place-items-center gap-6 bg-background-dark rounded-md p-4 min-w-[650px] w-max h-max min-h-[250px]"
            >
              <div className="flex flex-col gap-y-4 w-full h-[250px] overflow-auto relative z-1 container-address-form">
                {item.items.map((product) => (
                  <CardOrder
                    key={`${item.id}-${product.id}`}
                    quantity={product.quantity}
                    product={product.product as any}
                    price={product.price}
                  />
                ))}
              </div>

              <div className="flex flex-col relative h-full">
                <div
                  className="flex items-center gap-2 cursor-pointer transition duration-300 *:hover:text-primary-light relative"
                  onClick={() => handleOpenDetails(item)}
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
                  Pedido:{" "}
                  {item.status === "Finalizado" ? "Entregue" : "Pendente"}
                </p>

                {/* <ButtonsActions
                item={item as any}
                coupon={item.}
                status={item.status}
                onOpenModalForExchange={handleOpenModalItemForExchange}
              /> */}

                <div className="absolute bottom-4 w-full flex gap-2 items-center">
                  <p>Total do pedido:</p>
                  <span className="font-bold text-xl inline-flex">
                    {FormatValue(item.total || 0)}
                  </span>
                </div>
              </div>
            </div>
          ))
          .reverse()
      ) : (
        <p>Não há pedidos para exibir!</p>
      )}

      {isOpenDetails && selectedOrder && (
        <ModalBackground>
          <ModalDetailsOrder
            order={selectedOrder}
            onClose={() => setIsOpenDetails(false)}
          />
        </ModalBackground>
      )}

      {isOpenModalItemForExchange && selectedOrder && (
        <ModalBackground>
          <ModalExchange
            order={selectedOrder}
            onClose={() => setIsOpenModalItemForExchange(false)}
            chooseItem={chooseItemForExchange}
          />
        </ModalBackground>
      )}
    </section>
  );
}
