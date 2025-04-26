import { prismaClient } from '../../prisma-client/prisma-client';
import { StatusOrder } from './create-order-db';

class ListOrdersStatusDb {
  async listOrdersStatus(status?: StatusOrder) {
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
