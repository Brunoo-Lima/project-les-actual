import { StatusOrder } from '@prisma/client';
import { prismaClient } from '../../../prisma-client/prisma-client';

class ListReturnProductStatusDb {
  async listReturnProductStatus(status: StatusOrder) {
    return await prismaClient.exchangeRequest.findMany({
      where: { status: status },
      include: { order: true },
    });
  }
}

export { ListReturnProductStatusDb };
