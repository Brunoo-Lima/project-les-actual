import { Request, Response } from 'express';
import { QuantityCartService } from '../../services/cart/quantity-cart-service';

const quantityCartService = new QuantityCartService();

class QuantityCartController {
  async increaseQuantity(req: Request, res: Response) {
    try {
      const { productId } = req.body;
      const userId = req.query.user_id as string;

      const updatedCart = await quantityCartService.increaseItemQuantity(
        userId,
        productId
      );
      res.json(updatedCart);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async decreaseQuantity(req: Request, res: Response) {
    try {
      const { productId } = req.body;
      const userId = req.query.user_id as string;

      const updatedCart = await quantityCartService.decreaseItemQuantity(
        userId,
        productId
      );
      return res.json(updatedCart);
    } catch (error) {
      console.error('Erro ao diminuir quantidade:', error);
      return res.status(400).json('Erro ao diminuir quantidade do item');
    }
  }
}

export { QuantityCartController };
