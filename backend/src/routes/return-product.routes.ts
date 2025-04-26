import { Router } from 'express';
import { ListReturnProductStatusController } from '../controllers/order/return-product/list-return-product-status-controller';
import { CreateReturnProductController } from '../controllers/order/return-product/create-return-product-controller';
import { UpdateReturnProductController } from '../controllers/order/return-product/update-return-product-controller';
import { ListReturnProductController } from '../controllers/order/return-product/list-return-product-controller';

const returnProductRoutes = Router();

returnProductRoutes.post('/return-product/:userId', async (req, res) => {
  const createReturnProductController = new CreateReturnProductController();
  await createReturnProductController.handle(req, res);
});

returnProductRoutes.patch('/return-product/status', async (req, res) => {
  const updateReturnProductController = new UpdateReturnProductController();
  await updateReturnProductController.handle(req, res);
});

returnProductRoutes.get('/return-product/status', async (req, res) => {
  const listReturnProductStatusController =
    new ListReturnProductStatusController();
  await listReturnProductStatusController.handle(req, res);
});

returnProductRoutes.get('/return-products', async (req, res) => {
  const listReturnProductController = new ListReturnProductController();
  await listReturnProductController.handle(req, res);
});

export { returnProductRoutes };
