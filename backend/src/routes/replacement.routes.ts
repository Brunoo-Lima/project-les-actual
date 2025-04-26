import { Router } from 'express';
import { ListDetailReplacementController } from '../controllers/order/return-product/list-detail-replacement-controller';

const replacementRoutes = Router();

replacementRoutes.get('/replacement/:id', async (req, res) => {
  const listDetailReplacementController = new ListDetailReplacementController();
  await listDetailReplacementController.handle(req, res);
});

export { replacementRoutes };
