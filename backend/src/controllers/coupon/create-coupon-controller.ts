import { Request, Response } from 'express';
import { CreateCouponService } from '../../services/coupon/create-coupon-service';
import { format } from 'date-fns';

class CreateCouponController {
  async handle(req: Request, res: Response) {
    const { code, value, expiration, userId } = req.body;

    const dateFormatted = format(new Date(expiration), 'yyyy-MM-dd');
    const expirationDate = new Date(dateFormatted);

    const createCouponService = new CreateCouponService();

    const coupon = await createCouponService.execute(
      code,
      value,
      expirationDate,
      userId
    );

    return res.status(201).json(coupon);
  }
}

export { CreateCouponController };
