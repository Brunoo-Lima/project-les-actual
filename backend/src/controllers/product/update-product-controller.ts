import { Request, Response } from 'express';
import { IProduct } from '../../types/IProduct';
import { UpdateProductService } from '../../services/product/update-product-service';

class UpdateProductController {
  async handle(req: Request, res: Response) {
    const product_id = req.query.product_id as string;
    const productData: Partial<IProduct> = req.body;

    const updateProductService = new UpdateProductService();

    const product = await updateProductService.execute(product_id, productData);

    return res.json(product);
  }
}

export { UpdateProductController };
