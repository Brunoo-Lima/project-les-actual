import { Request, Response } from 'express';
import { CreateReplacementService } from '../../../services/order/replacement/create-replacement-service';

class CreateReplacementController {
  async handle(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { orderId, items, reason } = req.body;

      const createReplacementService = new CreateReplacementService();

      const result = await createReplacementService.execute(
        userId,
        orderId,
        items,
        reason
      );

      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export { CreateReplacementController };
