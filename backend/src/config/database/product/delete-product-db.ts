import { prismaClient } from '../../prisma-client/prisma-client';

class DeleteProductDb {
  async deleteProduct(product_id: string) {
    return await prismaClient.product.delete({
      where: {
        id: product_id,
      },
    });
  }
}

export { DeleteProductDb };
