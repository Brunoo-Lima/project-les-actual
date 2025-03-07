import { Router } from 'express';
import { CreateAddressController } from '../controllers/address/create-address-controller';
import { UpdateAddressController } from '../controllers/address/update-address-controller';

const addressRoutes = Router();

addressRoutes.put('/address', async (req, res) => {
  const createAddressController = new CreateAddressController();
  await createAddressController.handle(req, res);
});

addressRoutes.patch('/address', async (req, res) => {
  const updateAddressController = new UpdateAddressController();
  await updateAddressController.handle(req, res);
});

export { addressRoutes };
