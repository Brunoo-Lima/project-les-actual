import { prismaClient } from '../../prisma-client/prisma-client';

class ListOrdersStatusDb {
  async listOrdersStatus(status?: string) {
    return await prismaClient.order.findMany({
      where: {
        status: status,
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

export { ListOrdersStatusDb };
