export interface ReturnItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  total: string;
  status: string;
  freight: string;
  discountValue: string | null;
  created_at: string;
  updated_at: string;
  addressId: string;
}

export interface IReplacement {
  id: string;
  orderId: string;
  userId: string;
  items: string;
  // items: ReturnItem[]; // Isso será convertido de string JSON
  reason: string;
  status: StatusOrder; // você pode expandir conforme os status possíveis
  couponId: string | null;
  createdAt: string;
  updatedAt: string;
  order: Order;
  coupon: unknown | null; // definir tipo correto se houver dados de cupom
}

export type StatusOrder =
  | "AGUARDANDO_APROVACAO"
  | "REPROVADO"
  | "APROVADO"
  | "EM_PROCESSAMENTO"
  | "TROCA_SOLICITADA"
  | "TROCA_ACEITA"
  | "TROCA_CONCLUIDA"
  | "TROCA_RECUSADA"
  | "DEVOLUCAO_EM_ANDAMENTO"
  | "DEVOLUCAO_SOLICITADA"
  | "DEVOLUCAO_RECUSADA"
  | "DEVOLUCAO_CONCLUIDA"
  | "DEVOLUCAO_ACEITA"
  | "PEDIDO_DEVOLVIDO"
  | "CANCELADO"
  | "EM_TRANSPORTE"
  | "ENTREGUE";
