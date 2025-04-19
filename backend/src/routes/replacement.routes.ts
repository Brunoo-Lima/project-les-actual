import { Router } from 'express';
import { CreateReplacementController } from '../controllers/order/replacement/create-replacement-controller';
import { UpdateReplacementController } from '../controllers/order/replacement/update-replacement-controller';
import { ListReplacementController } from '../controllers/order/replacement/list-replacement-controller';

const replacementRoutes = Router();

replacementRoutes.post('/replacement/:userId', async (req, res) => {
  const createReplacementController = new CreateReplacementController();
  await createReplacementController.handle(req, res);
});

replacementRoutes.patch('/replacement/:id/status', async (req, res) => {
  const updateReplacementController = new UpdateReplacementController();
  await updateReplacementController.handle(req, res);
});

replacementRoutes.get('/replacement/:id', async (req, res) => {
  const listReplacementController = new ListReplacementController();
  await listReplacementController.handle(req, res);
});

export { replacementRoutes };
