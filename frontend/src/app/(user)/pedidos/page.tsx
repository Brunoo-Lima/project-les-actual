"use client";

import { IAddress } from "@/@types/IAddress";
import { Orders } from "@/components/layout/user/orders/orders";
import { useUseAuth } from "@/hooks/useAuth";
import { listOrders } from "@/services/order";
import { Metadata } from "next";
import { useEffect, useState } from "react";

// export const metadata: Metadata = {
//   title: "Pedidos",
//   description: "Página de pedidos",
// };

// TODO: Aqui posso fazer algum esquema de pedido em andamento, realizado ou cancelado, algo simulando o processo de compra

// Colocar algum delay no backend que leve um tempo para dar como concluido

// Colocar talvez parcelamento do pedido talvez

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

export default function OrdersPage() {
  return <Orders />;
}
