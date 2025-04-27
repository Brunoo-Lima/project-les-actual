import { Request, Response } from 'express';
import { CreateReturnProductService } from '../../../services/order/return-product/create-return-product-service';

class CreateReturnProductController {
  async handle(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { orderId, items, reason, requestType } = req.body;

      const createReturnProductService = new CreateReturnProductService();

      const result = await createReturnProductService.execute(
        userId,
        orderId,
        items,
        reason,
        requestType
      );

      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export { CreateReturnProductController };
