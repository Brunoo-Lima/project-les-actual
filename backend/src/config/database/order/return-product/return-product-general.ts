import { Decimal } from '@prisma/client/runtime/library';
import { prismaClient } from '../../../prisma-client/prisma-client';

export const ORDER_STATUS = {
  WAITING_APPROVAL: 'AGUARDANDO_APROVACAO',
  REJECTED: 'REPROVADO',
  APPROVED: 'APROVADO',
  PROCESSING: 'EM_PROCESSAMENTO',
  IN_TRANSIT: 'EM_TRANSPORTE',
  DELIVERED: 'ENTREGUE',
  EXCHANGE_REQUESTED: 'TROCA_SOLICITADA',
  EXCHANGE_ACCEPTED: 'TROCA_ACEITA',
  EXCHANGE_COMPLETED: 'TROCA_CONCLUIDA',
  EXCHANGE_REFUSED: 'TROCA_RECUSADA',
  RETURN_REQUESTED: 'DEVOLUCAO_SOLICITADA',
  RETURN_IN_PROGRESS: 'DEVOLUCAO_EM_ANDAMENTO',
  RETURN_REFUSED: 'DEVOLUCAO_RECUSADA',
  RETURN_COMPLETED: 'DEVOLUCAO_CONCLUIDA',
  RETURN_ACCEPTED: 'DEVOLUCAO_ACEITA',
  ORDER_RETURNED: 'PEDIDO_DEVOLVIDO',
  CANCELLED: 'CANCELADO',
} as const;

export type StatusOrder = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

class ReturnProductGeneral {
  async findOrderWithItems(orderId: string, userId: string) {
    return await prismaClient.order.findFirst({
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
        status: ORDER_STATUS.EXCHANGE_REQUESTED, // Troca solicitada
      },
    });
  }

  async createReturnRequest(
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
        status: ORDER_STATUS.RETURN_REQUESTED, // Devolução solicitada
      },
    });
  }

  async findExchangeRequest(exchangeId: string) {
    return await prismaClient.exchangeRequest.findUnique({
      where: { id: exchangeId },
      include: { order: true },
    });
  }

  async updateExchangeStatus(
    id: string,
    newStatus: StatusOrder,
    requestType: 'exchange' | 'return'
  ) {
    return await prismaClient.$transaction(async (tx) => {
      const exchange = await tx.exchangeRequest.findUnique({
        where: { id },
        include: {
          order: {
            include: {
              items: {
                include: {
                  product: {
                    include: {
                      stock: true,
                    },
                  },
                },
              },
            },
          },
          coupon: true,
        },
      });

      if (!exchange) throw new Error('Solicitação não encontrada');

      if (newStatus === ORDER_STATUS.ORDER_RETURNED) {
        // 2.1 Verifica se já foi processado (tem cupom)
        if (exchange.coupon) {
          throw new Error('Devolução já processada para este pedido');
        }

        // 2.2 Processa devolução ao estoque
        for (const item of exchange.order.items) {
          if (!item.product.stock) {
            throw new Error(
              `Produto ${item.product.id} sem estoque cadastrado`
            );
          }

          await tx.stock.update({
            where: { id: item.product.stock.id },
            data: { quantity: { increment: item.quantity } },
          });
        }

        // 2.3 Cria cupom (já serve como flag de processamento)
        const couponCode = `DEV-${Date.now()}`;
        const coupon = await tx.exchangeCoupon.create({
          data: {
            code: couponCode,
            value: new Decimal(exchange.order.total.toString()),
            expiration: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            status: 'active',
            isUsed: false,
            userId: exchange.userId,
          },
        });

        // 2.4 Atualiza a solicitação com o cupom
        await tx.exchangeRequest.update({
          where: { id },
          data: { couponId: coupon.id },
        });
      }

      return await tx.exchangeRequest.update({
        where: { id },
        data: { status: newStatus },
      });
    });
  }

  async handleRequestType(
    orderId: string,
    userId: string,
    items: string,
    reason: string,
    requestType: 'exchange' | 'return'
  ) {
    if (requestType === 'exchange') {
      return await this.createExchangeRequest(orderId, userId, items, reason);
    } else if (requestType === 'return') {
      return await this.createReturnRequest(orderId, userId, items, reason);
    } else {
      throw new Error('Tipo inválido. Use "exchange" ou "return".');
    }
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

function generateCouponCode(userId: string) {
  return `DEV-${userId.slice(0, 4)}-${Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase()}`;
}

export { ReturnProductGeneral };
