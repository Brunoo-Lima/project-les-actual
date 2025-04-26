import { Decimal } from '@prisma/client/runtime/library';
import { prismaClient } from '../../../prisma-client/prisma-client';

export type StatusOrder =
  | 'AGUARDANDO_APROVACAO'
  | 'REPROVADO'
  | 'APROVADO'
  | 'EM_PROCESSAMENTO'
  | 'TROCA_SOLICITADA'
  | 'TROCA_ACEITA'
  | 'TROCA_CONCLUIDA'
  | 'TROCA_RECUSADA'
  | 'DEVOLUCAO_EM_ANDAMENTO'
  | 'DEVOLUCAO_SOLICITADA'
  | 'DEVOLUCAO_RECUSADA'
  | 'DEVOLUCAO_CONCLUIDA'
  | 'PEDIDO_DEVOLVIDO'
  | 'CANCELADO'
  | 'EM_TRANSPORTE'
  | 'ENTREGUE';

class ReturnProductGeneral {
  async findOrderWithItems(orderId: string, userId: string) {
    return await prismaClient.order.findUnique({
      where: { id: orderId, userId },
      include: { items: true },
    });
  }

  async createExchangeRequest(
    orderId: string,
    userId: string,
    items: string,
    reason: string
  ) {
    return await prismaClient.exchangeRequest.create({
      data: {
        orderId,
        userId,
        items,
        reason,
        status: 'DEVOLUCAO_SOLICITADA',
      },
    });
  }

  async findExchangeRequest(exchangeId: string) {
    return await prismaClient.exchangeRequest.findUnique({
      where: { id: exchangeId },
      include: { order: true },
    });
  }

  async updateExchangeStatus(id: string, status: StatusOrder) {
    return await prismaClient.exchangeRequest.update({
      where: { id },
      data: { status },
    });
  }

  async createExchangeCoupon(
    code: string,
    value: Decimal,
    expiration: Date,
    userId: string
  ) {
    return await prismaClient.exchangeCoupon.create({
      data: {
        code,
        value,
        expiration,
        status: 'active',
        isUsed: false,
        userId,
      },
    });
  }

  async linkCouponToExchange(exchangeId: string, couponId: string) {
    return await prismaClient.exchangeRequest.update({
      where: { id: exchangeId },
      data: { couponId },
    });
  }
}

export { ReturnProductGeneral };
