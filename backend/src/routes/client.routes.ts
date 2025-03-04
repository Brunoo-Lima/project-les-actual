import { Router } from 'express';
import { CreateClientController } from '../controllers/client/create-client-controller';
import { DetailClientController } from '../controllers/client/detail-client-controller';

const clientRoutes = Router();

clientRoutes.post('/client', async (req, res) => {
  const createClientController = new CreateClientController();
  await createClientController.handle(req, res);
});

clientRoutes.get('/client', async (req, res) => {
  const detailClientController = new DetailClientController();
  await detailClientController.handle(req, res);
});

export { clientRoutes };
