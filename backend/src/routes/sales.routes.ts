import { Router } from 'express';
import { ListSalesController } from '../controllers/sales/list-sales-controller';

const salesRoutes = Router();

salesRoutes.get('/sales', async (req, res) => {
  const listSalesController = new ListSalesController();
  await listSalesController.handle(req, res);
});

export { salesRoutes };
