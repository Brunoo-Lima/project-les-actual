import { Router } from 'express';
import { CreateCartController } from '../controllers/order/create-cart-controller';
import { CreateOrderController } from '../controllers/order/create-order-controller';

const orderRoutes = Router();

orderRoutes.post('/cart', async (req, res) => {
  const createCartController = new CreateCartController();
  await createCartController.handle(req, res);
});

orderRoutes.post('/checkout', async (req, res) => {
  const createOrderController = new CreateOrderController();
  await createOrderController.handle(req, res);
});

export { orderRoutes };
