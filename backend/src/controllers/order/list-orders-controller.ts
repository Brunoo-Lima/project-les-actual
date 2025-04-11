import { Request, Response } from 'express';
import { ListOrdersService } from '../../services/order/list-orders-service';

class ListOrdersController {
  async handle(req: Request, res: Response) {
    const user_id = req.query.user_id as string;

    const listOrdersService = new ListOrdersService();

    try {
      const order = await listOrdersService.execute(user_id);

      return res.json(order);
    } catch (error) {
      console.error('Erro no ListOrderController:', error);
      return res.status(500).json({ error: 'Falha ao listar pedido' });
    }
  }
}

export { ListOrdersController };
