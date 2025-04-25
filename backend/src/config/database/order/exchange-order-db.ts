import { Decimal } from '@prisma/client/runtime/library';
import { prismaClient } from '../../prisma-client/prisma-client';

export type ExchangeStatus =
  | 'AGUARDANDO_APROVACAO'
  | 'TROCA_AUTORIZADA'
  | 'DEVOLUCAO_EM_ANDAMENTO'
  | 'PEDIDO_DEVOLVIDO'
  | 'TROCA_RECUSADA';

class ExchangeOrderDb {
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
        status: 'AGUARDANDO_APROVACAO',
      },
    });
  }

  async findExchangeRequest(exchangeId: string) {
    return await prismaClient.exchangeRequest.findUnique({
      where: { id: exchangeId },
      include: { order: true },
    });
  }

  async updateExchangeStatus(id: string, status: ExchangeStatus) {
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

export { ExchangeOrderDb };
