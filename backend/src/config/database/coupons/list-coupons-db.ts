import { prismaClient } from '../../prisma-client/prisma-client';

class ListCouponsDb {
  async listCoupons(userId: string) {
    return await prismaClient.exchangeCoupon.findMany({
      where: {
        userId,
      },
    });
  }
}

export { ListCouponsDb };
