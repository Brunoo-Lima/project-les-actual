import { Router } from 'express';
import { CreateAddressController } from '../controllers/address/create-address-controller';
import { UpdateAddressController } from '../controllers/address/update-address-controller';
import { DeleteAddressController } from '../controllers/address/delete-address-controller';

const addressRoutes = Router();

addressRoutes.put('/address', async (req, res) => {
  const createAddressController = new CreateAddressController();
  await createAddressController.handle(req, res);
});

addressRoutes.patch('/address', async (req, res) => {
  const updateAddressController = new UpdateAddressController();
  await updateAddressController.handle(req, res);
});

addressRoutes.delete('/address', async (req, res) => {
  const deleteAddressController = new DeleteAddressController();
  await deleteAddressController.handle(req, res);
});

export { addressRoutes };
