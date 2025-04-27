import { Request, Response } from 'express';
import { ListDetailOrderService } from '../../services/order/list-orders-status-service';
import { StatusOrder } from '../../config/database/order/create-order-db';

class ListOrdersStatusController {
  async handle(req: Request, res: Response) {
    const status = req.query.status as string;

    const listDetailOrderService = new ListDetailOrderService();

    try {
      const order = await listDetailOrderService.execute(status as StatusOrder);

      return res.json(order);
    } catch (error) {
      console.error('Erro no ListOrderController:', error);
      return res.status(500).json({ error: 'Falha ao listar pedido' });
    }
  }
}

export { ListOrdersStatusController };
