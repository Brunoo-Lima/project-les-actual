import { Router } from 'express';
import { CreatePhoneController } from '../controllers/phone/create-phone-controller';

const phoneRoutes = Router();

phoneRoutes.put('/phone', async (req, res) => {
  const createPhoneController = new CreatePhoneController();
  await createPhoneController.handle(req, res);
});

export { phoneRoutes };
