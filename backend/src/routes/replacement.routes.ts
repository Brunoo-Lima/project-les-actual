import { Router } from 'express';
import { CreateReplacementController } from '../controllers/order/replacement/create-replacement-controller';
import { UpdateReplacementController } from '../controllers/order/replacement/update-replacement-controller';
import { ListDetailReplacementController } from '../controllers/order/replacement/list-detail-replacement-controller';
import { ListReplacementsController } from '../controllers/order/replacement/list-replacements-controller';
import { ListReplacementStatusController } from '../controllers/order/replacement/list-replacement-status-controller';

const replacementRoutes = Router();

replacementRoutes.post('/replacement/:userId', async (req, res) => {
  const createReplacementController = new CreateReplacementController();
  await createReplacementController.handle(req, res);
});

replacementRoutes.patch('/replacement/status', async (req, res) => {
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

replacementRoutes.get('/replacements/status', async (req, res) => {
  const listReplacementStatusController = new ListReplacementStatusController();
  await listReplacementStatusController.handle(req, res);
});

export { replacementRoutes };
