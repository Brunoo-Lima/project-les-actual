import { Router } from 'express';
import { CreateReplacementController } from '../controllers/order/replacement/create-replacement-controller';
import { UpdateReplacementController } from '../controllers/order/replacement/update-replacement-controller';
import { ListDetailReplacementController } from '../controllers/order/replacement/list-detail-replacement-controller';
import { ListReplacementsController } from '../controllers/order/replacement/list-replacements-controller';

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
  const listDetailReplacementController = new ListDetailReplacementController();
  await listDetailReplacementController.handle(req, res);
});

replacementRoutes.get('/replacements', async (req, res) => {
  const listReplacementsController = new ListReplacementsController();
  await listReplacementsController.handle(req, res);
});

export { replacementRoutes };
