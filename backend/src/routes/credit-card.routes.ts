import { Router } from 'express';
import { CreateCreditCardController } from '../controllers/credit-card/create-credit-card-controller';
import { UpdateCreditCardController } from '../controllers/credit-card/update-credit-card-controller';
import { DeleteCreditCardController } from '../controllers/credit-card/delete-credit-card-controller';

const creditCardRoutes = Router();

creditCardRoutes.put('/credit-card', async (req, res) => {
  const createCreditCardController = new CreateCreditCardController();
  await createCreditCardController.handle(req, res);
});

creditCardRoutes.patch('/credit-card', async (req, res) => {
  const updateCreditCardController = new UpdateCreditCardController();
  await updateCreditCardController.handle(req, res);
});

creditCardRoutes.delete('/credit-card', async (req, res) => {
  const deleteCreditCardController = new DeleteCreditCardController();
  await deleteCreditCardController.handle(req, res);
});

export { creditCardRoutes };
