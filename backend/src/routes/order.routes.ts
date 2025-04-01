import { Router } from 'express';
import { CreateCartController } from '../controllers/order/create-cart-controller';

const orderRoutes = Router();

orderRoutes.post('/cart', async (req, res) => {
  const createCartController = new CreateCartController();
  await createCartController.handle(req, res);
});

export { orderRoutes };
