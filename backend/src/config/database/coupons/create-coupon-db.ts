import { prismaClient } from '../../prisma-client/prisma-client';

class CreateCouponDb {
  async createCoupon(
    code: string,
    value: number,
    expiration: Date,
    userId: string
  ) {
    return await prismaClient.exchangeCoupon.create({
      data: {
        code,
        value,
        expiration,
        status: 'active',
        isUsed: false,
        userId,
      },
    });
  }
}

export { CreateCouponDb };
