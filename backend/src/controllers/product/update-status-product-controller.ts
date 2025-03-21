import { Request, Response } from 'express';
import { UpdateStatusProductService } from '../../services/product/update-status-product-service';

interface IProductStatus {
  status: boolean;
  inactiveReason?: string;
}
class UpdateStatusProductController {
  async handle(req: Request, res: Response) {
    const product_id = req.query.product_id as string;
    const { status, inactiveReason }: IProductStatus = req.body;

    const updateStatusProductService = new UpdateStatusProductService();

    const updateStatusProduct = await updateStatusProductService.execute(
      product_id as string,
      {
        status,
        inactiveReason,
      }
    );

    return res.status(201).json(updateStatusProduct);
  }
}

export { UpdateStatusProductController };
