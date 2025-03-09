import { Router } from 'express';
import { CreatePhoneController } from '../controllers/phone/create-phone-controller';
import { UpdatePhoneController } from '../controllers/phone/update-phone-controller';
import { DeletePhoneController } from '../controllers/phone/delete-phone-controller';

const phoneRoutes = Router();

phoneRoutes.put('/phone', async (req, res) => {
  const createPhoneController = new CreatePhoneController();
  await createPhoneController.handle(req, res);
});

phoneRoutes.patch('/phone', async (req, res) => {
  const updatePhoneController = new UpdatePhoneController();
  await updatePhoneController.handle(req, res);
});

phoneRoutes.delete('/phone', async (req, res) => {
  const deletePhoneController = new DeletePhoneController();
  await deletePhoneController.handle(req, res);
});

export { phoneRoutes };
