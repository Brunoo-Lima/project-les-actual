import { Request, Response } from 'express';
import { CreateCartService } from '../../services/order/create-cart-service';
import { ICart } from '../../types/ICart';

class CreateCartController {
  async handle(req: Request, res: Response) {
    // const userId = req.query.userId as string;

    const { userId, items } = req.body;

    const createCartService = new CreateCartService();

    try {
      const result = await createCartService.execute(userId, { items });
      return res.status(201).json(result);
    } catch (error) {
      console.error('Erro no CreateCartController:', error);
      return res.status(500).json({ error: 'Falha ao criar carrinho' });
    }
  }
}

export { CreateCartController };
