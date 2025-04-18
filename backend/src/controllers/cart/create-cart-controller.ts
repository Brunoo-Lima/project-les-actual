import { Request, Response } from 'express';
import { CreateCartService } from '../../services/cart/create-cart-service';

class CreateCartController {
  async handle(req: Request, res: Response) {
    const { userId } = req.body;

    try {
      const service = new CreateCartService();
      const cart = await service.execute(userId);
      return res.json(cart);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { CreateCartController };
