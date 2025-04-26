import { prismaClient } from '../../prisma-client/prisma-client';

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

class UpdateOrderStatusDb {
  async updateOrderStatus(orderId: string, newStatus: StatusOrder) {
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

      // 2. Se for aprovação, processar e mudar para "Em trânsito"
      let finalStatus = newStatus;

      if (newStatus === 'APROVADO') {
        finalStatus = 'EM_TRANSPORTE';
      }

      if (newStatus === 'APROVADO') {
        await this.processOrderApproval(order, prisma);
      }

      // 3. Atualizar o status do pedido
      return await prisma.order.update({
        where: { id: orderId },
        data: {
          status: finalStatus,
          payments: {
            updateMany: {
              where: {
                status: 'pending',
              },
              data: {
                status: 'completed',
              },
            },
          },
        },
        include: {
          items: true,
        },
      });
    });
  }

  private async processOrderApproval(order: any, prisma: any) {
    // Verificar estoque para todos os itens primeiro
    for (const item of order.items) {
      if (!item.product.stock) {
        throw new Error(`Produto ${item.product.id} sem estoque cadastrado`);
      }
      if (item.product.stock.quantity < item.quantity) {
        throw new Error(
          `Estoque insuficiente para o produto ${item.product.id}`
        );
      }
    }

    // Atualizar estoque
    for (const item of order.items) {
      await prisma.stock.update({
        where: { id: item.product.stock.id },
        data: {
          quantity: { decrement: item.quantity },
          reserved: { decrement: item.quantity },
        },
      });
    }
  }
}

export { UpdateOrderStatusDb };
