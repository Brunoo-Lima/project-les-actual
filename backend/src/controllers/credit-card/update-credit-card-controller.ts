import { Request, Response } from 'express';
import { ICreditCard } from '../../types/ICreditCard';
import { UpdateCreditCardService } from '../../services/credit-card/update-credit-card-service';

class UpdateCreditCardController {
  async handle(req: Request, res: Response) {
    const creditCard_id = req.query.creditCard_id as string;
    const user_id = req.query.user_id as string;
    const creditCardData: Partial<ICreditCard> = req.body;

    const updateCreditCardService = new UpdateCreditCardService();

    const updateCreditCard = await updateCreditCardService.execute(
      user_id,
      creditCard_id,
      creditCardData
    );

    return res.status(201).json(updateCreditCard);
  }
}

export { UpdateCreditCardController };
