import { Request, Response } from 'express';
import { AddCartItemService } from '../../services/cart/add-item-cart-service';

class AddItemCartController {
  async handle(req: Request, res: Response) {
    const { userId, items } = req.body;

    try {
      const service = new AddCartItemService();
      const cart = await service.execute(userId, items);
      return res.json(cart);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { AddItemCartController };
