import { Request, Response } from 'express';
import { UpdateReplacementService } from '../../../services/order/replacement/update-replacement-service';

class UpdateReplacementController {
  async handle(req: Request, res: Response) {
    try {
      const { exchangeId } = req.params;
      const { status } = req.body;

      const updateReplacementService = new UpdateReplacementService();

      const result = await updateReplacementService.execute(exchangeId, status);

      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export { UpdateReplacementController };
