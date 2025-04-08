import { Request, Response } from 'express';
import { ListCartService } from '../../services/cart/list-cart-service';

class ListCartController {
  async handle(req: Request, res: Response) {
    const { user_id } = req.query as { user_id: string };

    const listCartService = new ListCartService();

    try {
      const cart = await listCartService.execute(user_id);

      return res.status(200).json({
        success: true,
        data: cart,
      });
    } catch (error: any) {
      console.error(error.message.includes('não encontrado') ? 404 : 500);
      throw new Error('Error na controller');
    }
  }
}

export { ListCartController };
