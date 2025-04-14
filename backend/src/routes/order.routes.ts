import { Router } from 'express';
import { CreateCartController } from '../controllers/cart/create-cart-controller';
import { CreateOrderController } from '../controllers/order/create-order-controller';
import { ListCartController } from '../controllers/cart/list-cart-controller';
import { ListDetailOrderController } from '../controllers/order/list-detail-order-controller';
import { ListOrdersController } from '../controllers/order/list-orders-controller';
import { RemoveItemCartController } from '../controllers/cart/remove-item-cart-controller';
import { QuantityCartController } from '../controllers/cart/quantity-cart-controller';

const orderRoutes = Router();

//carrinho
orderRoutes.post('/cart', async (req, res) => {
  const createCartController = new CreateCartController();
  await createCartController.handle(req, res);
});

orderRoutes.get('/cart', async (req, res) => {
  const listCartController = new ListCartController();
  await listCartController.handle(req, res);
});

orderRoutes.delete('/cart/:userId', async (req, res) => {
  const removeItemCartController = new RemoveItemCartController();
  await removeItemCartController.handle(req, res);
});

const quantityCartController = new QuantityCartController();
orderRoutes.patch('/cart/increase', async (req, res) => {
  await quantityCartController.increaseQuantity(req, res);
});
orderRoutes.patch('/cart/decrease', async (req, res) => {
  await quantityCartController.decreaseQuantity(req, res);
});

//pedidos

orderRoutes.post('/checkout', async (req, res) => {
  const createOrderController = new CreateOrderController();
  await createOrderController.handle(req, res);
});

orderRoutes.get('/order', async (req, res) => {
  const listDetailOrderController = new ListDetailOrderController();
  await listDetailOrderController.handle(req, res);
});

orderRoutes.get('/orders', async (req, res) => {
  const listOrdersController = new ListOrdersController();
  await listOrdersController.handle(req, res);
});

export { orderRoutes };
