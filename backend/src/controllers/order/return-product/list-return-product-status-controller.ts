import { Request, Response } from 'express';
import { StatusOrder } from '../../../config/database/order/create-order-db';
import { ListReturnProductStatusService } from '../../../services/order/return-product/list-return-product-status-service';

class ListReturnProductStatusController {
  async handle(req: Request, res: Response) {
    const { status } = req.query as { status: StatusOrder };

    const listReturnProductStatusService = new ListReturnProductStatusService();

    const replacements = await listReturnProductStatusService.execute(
      status as StatusOrder
    );

    res.status(200).json(replacements);
  }
}

export { ListReturnProductStatusController };
