import { Request, Response } from 'express';
import { ListDetailOrderService } from '../../services/order/list-detail-order-service';

class ListDetailOrderController {
  async handle(req: Request, res: Response) {
    const user_id = req.query.user_id as string;

    const listDetailOrderService = new ListDetailOrderService();

    try {
      const order = await listDetailOrderService.execute(user_id);

      return res.json(order);
    } catch (error) {
      console.error('Erro no ListOrderController:', error);
      return res.status(500).json({ error: 'Falha ao listar pedido' });
    }
  }
}

export { ListDetailOrderController };
