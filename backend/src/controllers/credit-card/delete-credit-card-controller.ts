import { Request, Response } from 'express';
import { DeleteCreditCardService } from '../../services/credit-card/delete-credit-card-service';

class DeleteCreditCardController {
  async handle(req: Request, res: Response) {
    const creditCard_id = req.query.creditCard_id as string;

    const deleteCreditCardService = new DeleteCreditCardService();

    await deleteCreditCardService.execute(creditCard_id);

    return res.json('Cartão de crédito excluído com sucesso!');
  }
}

export { DeleteCreditCardController };
