import { Request, Response } from 'express';
import { UpdateOrderStatusService } from '../../services/order/update-order-status-service';

class UpdateOrderStatusController {
  async handle(req: Request, res: Response) {
    const { orderId } = req.params;
    const { status } = req.body;

    const updateOrderStatusService = new UpdateOrderStatusService();

    try {
      const result = await updateOrderStatusService.execute(orderId, status);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { UpdateOrderStatusController };
