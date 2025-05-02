import { CreateCouponDb } from '../../config/database/coupons/create-coupon-db';

class CreateCouponService {
  private createCouponDb: CreateCouponDb;

  constructor() {
    this.createCouponDb = new CreateCouponDb();
  }
  async execute(code: string, value: number, expiration: Date, userId: string) {
    return await this.createCouponDb.createCoupon(
      code,
      value,
      expiration,
      userId
    );
  }
}

export { CreateCouponService };
