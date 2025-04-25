import { prismaClient } from '../../../prisma-client/prisma-client';
import { ExchangeStatus } from '../exchange-order-db';

class ListReplacementStatusDb {
  async listReplacementStatus(status: ExchangeStatus) {
    return await prismaClient.exchangeRequest.findMany({
      where: { status: status },
    });
  }
}

export { ListReplacementStatusDb };
