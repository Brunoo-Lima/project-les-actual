import { Request, Response } from 'express';
import { ApproveOrderService } from '../../services/order/approve-order-service';

class ApproveOrderController {
  async handle(req: Request, res: Response) {
    const { orderId } = req.params;

    const approveOrderService = new ApproveOrderService();

    try {
      const result = await approveOrderService.execute(orderId);
      return res.status(200).json(result);
    } catch (error: any) {
      console.error('Erro no ApproveOrderController:', error);
      return res.status(400).json({ error: error.message });
    }
  }
}

export { ApproveOrderController };
