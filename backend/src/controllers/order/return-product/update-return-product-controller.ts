import { Request, Response } from 'express';
import { UpdateReturnProductService } from '../../../services/order/return-product/update-return-product-service';

class UpdateReturnProductController {
  async handle(req: Request, res: Response) {
    try {
      const { status, id } = req.body;

      const updateReturnProductService = new UpdateReturnProductService();

      const result = await updateReturnProductService.execute(id, status);

      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}

export { UpdateReturnProductController };
