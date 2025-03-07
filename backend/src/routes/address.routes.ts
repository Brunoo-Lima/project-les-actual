import { Router } from 'express';
import { CreateAddressController } from '../controllers/address/create-address-controller';

const addressRoutes = Router();

addressRoutes.put('/client', async (req, res) => {
  const createAddressController = new CreateAddressController();
  await createAddressController.handle(req, res);
});

export { addressRoutes };
