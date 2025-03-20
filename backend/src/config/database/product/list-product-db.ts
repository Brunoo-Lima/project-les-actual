import { prismaClient } from '../../prisma-client/prisma-client';

class ListProductDb {
  async listProduct() {
    return await prismaClient.product.findMany();
  }
}

export { ListProductDb };
