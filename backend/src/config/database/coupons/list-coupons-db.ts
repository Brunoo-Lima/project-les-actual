import { prismaClient } from '../../prisma-client/prisma-client';

class ListCouponsDb {
  async listCoupons(userId: string) {
    return await prismaClient.exchangeCoupon.findMany({
      where: { userId },
      select: {
        id: true,
        code: true,
        value: true,
        status: true,
        userId: true,
        expiration: true,
        isUsed: true,
        created_at: true,
        updated_at: true,
      },
    });
  }
}

export { ListCouponsDb };
