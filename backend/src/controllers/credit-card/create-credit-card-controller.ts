import { Request, Response } from 'express';
import { ICreditCard } from '../../types/ICreditCard';
import { CreateCreditCardService } from '../../services/credit-card/create-credit-card-service';

class CreateCreditCardController {
  async handle(req: Request, res: Response) {
    const user_id = req.query.user_id as string;
    const creditCardData: ICreditCard = req.body;

    const createCreditCardService = new CreateCreditCardService();

    const creditCard = await createCreditCardService.execute(
      user_id as string,
      creditCardData
    );

    return res.status(201).json(creditCard);
  }
}

export { CreateCreditCardController };
