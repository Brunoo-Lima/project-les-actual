// approve-order-db.ts
import { prismaClient } from '../../prisma-client/prisma-client';

class ApproveOrderDb {
  async approveOrder(orderId: string) {
    return await prismaClient.$transaction(async (prisma) => {
      // 1. Buscar o pedido
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
        },
      });

      if (!order) throw new Error('Pedido não encontrado');
      if (order.status !== 'Pendente') throw new Error('Pedido já processado');

      // 2. Atualizar estoque para cada item
      for (const item of order.items) {
        if (!item.product.stock) {
          throw new Error(`Produto ${item.product.id} sem estoque cadastrado`);
        }

        await prisma.stock.update({
          where: { id: item.product.stock.id },
          data: {
            quantity: {
              decrement: item.quantity,
            },
            reserved: {
              decrement: item.quantity,
            },
          },
        });
      }

      // 3. Atualizar status do pedido
      const updatedOrder = await prisma.order.update({
        where: { id: orderId },
        data: {
          status: 'Aprovado',
          payments: {
            updateMany: {
              where: { status: 'pending' },
              data: { status: 'completed' },
            },
          },
        },
        include: {
          items: true,
          payments: true,
        },
      });

      return updatedOrder;
    });
  }
}

export { ApproveOrderDb };
