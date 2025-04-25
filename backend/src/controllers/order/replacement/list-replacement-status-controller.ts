import { Request, Response } from 'express';
import { ListReplacementStatusService } from '../../../services/order/replacement/list-replacement-status-service';
import { ExchangeStatus } from '../../../config/database/order/exchange-order-db';

class ListReplacementStatusController {
  async handle(req: Request, res: Response) {
    const { status } = req.query as { status: ExchangeStatus };

    const listReplacementStatusService = new ListReplacementStatusService();

    const replacements = await listReplacementStatusService.execute(
      status as ExchangeStatus
    );

    res.status(200).json(replacements);
  }
}

export { ListReplacementStatusController };
