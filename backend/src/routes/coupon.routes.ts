import { Router } from 'express';
import { ListCouponsController } from '../controllers/coupon/list-coupons-controller';
import { CreateCouponController } from '../controllers/coupon/create-coupon-controller';

const couponRoutes = Router();

couponRoutes.post('/coupons', async (req, res) => {
  const createCouponController = new CreateCouponController();
  await createCouponController.handle(req, res);
});

couponRoutes.get('/coupons', async (req, res) => {
  const listCouponsController = new ListCouponsController();
  await listCouponsController.handle(req, res);
});

export { couponRoutes };
