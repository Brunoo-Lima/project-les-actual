import { prismaClient } from '../../prisma-client/prisma-client';

class ListProductDb {
  async listProduct() {
    return await prismaClient.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        image: true,
        brand: true,
        universe: true,
        material: true,
        depth: true,
        height: true,
        weight: true,
        width: true,
        isAvailable: true,
        categoryIsAvailable: true,
        inactiveReason: true,
        stockId: true,
        stock: {
          select: {
            quantity: true,
          },
        },
      },
    });
  }
}

export { ListProductDb };
