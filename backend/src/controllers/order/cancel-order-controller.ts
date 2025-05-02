import { Request, Response } from 'express';
import { CancelOrderService } from '../../services/order/cancel-order-service';

class CancelOrderController {
  async handle(request: Request, response: Response) {
    const orderId = request.query.orderId as string;

    try {
      const cancelOrderService = new CancelOrderService();
      const canceledOrder = await cancelOrderService.cancelOrder(orderId);

      return response.json(canceledOrder);
    } catch (error: any) {
      return response.status(400).json({
        message: error.message || 'Unexpected error.',
      });
    }
  }
}

export { CancelOrderController };
