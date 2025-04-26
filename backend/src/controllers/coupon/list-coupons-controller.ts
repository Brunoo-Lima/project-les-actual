import { Request, Response } from 'express';
import { ListCouponsService } from '../../services/coupon/list-coupons-service';

class ListCouponsController {
  async handle(req: Request, res: Response) {
    const { userId } = req.params;

    const listCouponsService = new ListCouponsService();

    const coupons = await listCouponsService.execute(userId);

    return res.json(coupons);
  }
}

export { ListCouponsController };
