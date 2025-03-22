import { Request, Response } from 'express';
import { UpdateStatusProductService } from '../../services/product/update-status-product-service';
import { CategoryIsAvailable } from '../../types/IProduct';

interface IProductStatus {
  status: boolean;
  categoryIsAvailable: CategoryIsAvailable;
  inactiveReason?: string;
}
class UpdateStatusProductController {
  async handle(req: Request, res: Response) {
    const product_id = req.query.product_id as string;
    const { status, inactiveReason, categoryIsAvailable }: IProductStatus =
      req.body;

    const updateStatusProductService = new UpdateStatusProductService();

    const updateStatusProduct = await updateStatusProductService.execute(
      product_id as string,
      {
        status,
        categoryIsAvailable,
        inactiveReason,
      }
    );

    return res.status(201).json(updateStatusProduct);
  }
}

export { UpdateStatusProductController };
