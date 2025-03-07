import { Router } from 'express';
import { CreateCreditCardController } from '../controllers/credit-card/create-credit-card-controller';

const creditCardRoutes = Router();

creditCardRoutes.put('/credit-card', async (req, res) => {
  const createCreditCardController = new CreateCreditCardController();
  await createCreditCardController.handle(req, res);
});

export { creditCardRoutes };
