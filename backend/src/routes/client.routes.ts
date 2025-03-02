import { Router } from 'express';
import { CreateClientController } from '../controllers/client/create-client-controller';

const clientRoutes = Router();

clientRoutes.post('/client', async (req, res) => {
  const createClientController = new CreateClientController();
  await createClientController.handle(req, res);
});

export { clientRoutes };
