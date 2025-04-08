import { Router } from 'express';
import { CreateCartController } from '../controllers/cart/create-cart-controller';
import { CreateOrderController } from '../controllers/order/create-order-controller';
import { ListCartController } from '../controllers/cart/list-cart-controller';

const orderRoutes = Router();

orderRoutes.post('/cart', async (req, res) => {
  const createCartController = new CreateCartController();
  await createCartController.handle(req, res);
});

orderRoutes.get('/cart', async (req, res) => {
  const listCartController = new ListCartController();
  await listCartController.handle(req, res);
});

orderRoutes.post('/checkout', async (req, res) => {
  const createOrderController = new CreateOrderController();
  await createOrderController.handle(req, res);
});

export { orderRoutes };
