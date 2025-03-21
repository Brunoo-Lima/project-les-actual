import { prismaClient } from '../../prisma-client/prisma-client';

interface IProductStatus {
  status: boolean;
  inactiveReason?: string;
}

class UpdateStatusProductDb {
  async updateStatusProduct(product_id: string, data: IProductStatus) {
    return await prismaClient.product.update({
      where: {
        id: product_id,
      },

      data: {
        isAvailable: data.status,
        inactiveReason: data.inactiveReason,
        updated_at: new Date(),
      },

      select: {
        id: true,
        category: true,
        image: true,
        name: true,
        price: true,
        brand: true,
        description: true,
        material: true,
        universe: true,
        inactiveReason: true,
        isAvailable: true,
        depth: true,
        height: true,
        weight: true,
        width: true,
        stock: {
          select: {
            quantity: true,
          },
        },
        created_at: true,
        updated_at: true,
      },
    });
  }
}

export { UpdateStatusProductDb };
