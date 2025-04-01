import { CategoryIsAvailable } from '../../../types/IProduct';
import { prismaClient } from '../../prisma-client/prisma-client';

interface IProductStatus {
  status: boolean;
  inactiveReason?: string;
  categoryIsAvailable: CategoryIsAvailable;
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
        categoryIsAvailable: data.categoryIsAvailable,
        updated_at: new Date(),
      },

      select: {
        id: true,
        image: true,
        name: true,
        price: true,
        brand: true,
        description: true,
        material: true,
        universe: true,
        inactiveReason: true,
        isAvailable: true,
        categoryIsAvailable: true,
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
