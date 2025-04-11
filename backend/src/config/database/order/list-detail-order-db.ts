import { prismaClient } from '../../prisma-client/prisma-client';

class ListDetailOrderDb {
  async listDetailOrder(userId: string) {
    return await prismaClient.order.findFirst({
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

export { ListDetailOrderDb };
