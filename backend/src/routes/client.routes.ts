import { Router } from 'express';
import { CreateClientController } from '../controllers/client/create-client-controller';
import { DetailClientController } from '../controllers/client/detail-client-controller';
import { DeleteClientController } from '../controllers/client/delete-client-controller';
import { UpdateClientController } from '../controllers/client/update-client-controller';
import { ListClientController } from '../controllers/client/list-client-controller';
import { UpdateStatusClientController } from '../controllers/client/update-status-client-controller';
import { FilterClientController } from '../controllers/client/filter-client-controller';

const clientRoutes = Router();

clientRoutes.post('/client', async (req, res) => {
  const createClientController = new CreateClientController();
  await createClientController.handle(req, res);
});

clientRoutes.get('/client', async (req, res) => {
  const detailClientController = new DetailClientController();
  await detailClientController.handle(req, res);
});

clientRoutes.get('/clients', async (req, res) => {
  const listClientController = new ListClientController();
  await listClientController.handle(req, res);
});

clientRoutes.delete('/client', async (req, res) => {
  const deleteClientController = new DeleteClientController();
  await deleteClientController.handle(req, res);
});

clientRoutes.patch('/client', async (req, res) => {
  const updateClientController = new UpdateClientController();
  await updateClientController.handle(req, res);
});

clientRoutes.patch('/statusClient', async (req, res) => {
  const updateStatusClientController = new UpdateStatusClientController();
  await updateStatusClientController.handle(req, res);
});

clientRoutes.post('/client/filter', async (req, res) => {
  const filterClientController = new FilterClientController();
  await filterClientController.handle(req, res);
});

export { clientRoutes };
