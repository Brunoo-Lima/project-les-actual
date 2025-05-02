import { UpdateOrderStatusDb } from '../../config/database/order/update-order-status-db';
import { prismaClient } from '../../config/prisma-client/prisma-client';

class CancelOrderService {
  private updateOrderStatusDb: UpdateOrderStatusDb;

  constructor() {
    this.updateOrderStatusDb = new UpdateOrderStatusDb();
  }

  async cancelOrder(orderId: string) {
    return await prismaClient.$transaction(async (prisma) => {
      // 1. Buscar o pedido com itens e estoque
      const order = await prisma.order.findUnique({
        where: { id: orderId },
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
          payments: true,
        },
      });

      if (!order) throw new Error('Pedido não encontrado');

      // Verificar se o pedido já está cancelado
      if (order.status === 'CANCELADO') {
        throw new Error('Pedido já está cancelado');
      }

      // Verificar se o pedido pode ser cancelado (dependendo das regras de negócio)
      const allowedStatusesToCancel = ['AGUARDANDO_APROVACAO', 'APROVADO'];
      if (!allowedStatusesToCancel.includes(order.status)) {
        throw new Error(
          `Pedido com status ${order.status} não pode ser cancelado`
        );
      }

      // Se o pedido foi aprovado, devemos devolver os itens ao estoque
      if (order.status === 'APROVADO') {
        await this.restoreStock(order, prisma);
      }

      // Atualizar o status para CANCELADO
      return await this.updateOrderStatusDb.updateOrderStatus(
        orderId,
        'CANCELADO'
      );
    });
  }

  private async restoreStock(order: any, prisma: any) {
    // Verificar estoque para todos os itens primeiro
    for (const item of order.items) {
      if (!item.product.stock) {
        throw new Error(`Produto ${item.product.id} sem estoque cadastrado`);
      }
    }

    // Atualizar estoque (devolver os itens)
    for (const item of order.items) {
      await prisma.stock.update({
        where: { id: item.product.stock.id },
        data: {
          quantity: { increment: item.quantity },
          // Não precisamos mexer no reserved pois já foi decrementado quando o pedido foi aprovado
        },
      });
    }
  }
}

export { CancelOrderService };
