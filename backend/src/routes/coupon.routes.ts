import { Router } from 'express';
import { ListCouponsController } from '../controllers/coupon/list-coupons-controller';

const couponRoutes = Router();

couponRoutes.get('/coupons/:id', async (req, res) => {
  const listCouponsController = new ListCouponsController();
  await listCouponsController.handle(req, res);
});

export { couponRoutes };
