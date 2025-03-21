import { Request, Response } from 'express';
import { DeleteProductService } from '../../services/product/delete-product-service';

class DeleteProductController {
  async handle(req: Request, res: Response) {
    const product_id = req.query.product_id as string;

    const deleteProductService = new DeleteProductService();

    await deleteProductService.execute(product_id);

    return res.json('Produto deletado com sucesso!');
  }
}

export { DeleteProductController };
