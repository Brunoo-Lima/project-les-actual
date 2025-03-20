import { IProduct } from '../../../types/IProduct';
import { prismaClient } from '../../prisma-client/prisma-client';

class UpdateProductDb {
  async updateProduct(product_id: string, product: Partial<IProduct>) {
    return await prismaClient.product.update({
      where: {
        id: product_id,
      },
      data: {
        ...product,
      },
    });
  }
}

export { UpdateProductDb };
