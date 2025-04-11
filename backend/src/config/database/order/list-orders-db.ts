import { prismaClient } from '../../prisma-client/prisma-client';

class ListOrdersDb {
  async listOrders(userId: string) {
    return await prismaClient.order.findMany({
      where: {
        userId,
        // isActive: true,
        // expires_at: {
        //   gt: new Date(), // Só retorna carrinhos não expirados
        // },
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                name: true,
                image: true,
                universe: true,
              },
            },
          },
        },
        address: true,
        payments: true,
      },
    });
  }
}

export { ListOrdersDb };
