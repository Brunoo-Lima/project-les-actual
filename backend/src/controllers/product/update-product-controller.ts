import { Request, Response } from 'express';
import { UpdateProductService } from '../../services/product/update-product-service';

class UpdateProductController {
  async handle(req: Request, res: Response) {
    const product_id = req.query.product_id as string;
    const {
      name,
      price,
      brand,
      description,
      material,
      universe,
      inactiveReason,
      depth,
      height,
      weight,
      width,
      image,
      categoryIsAvailable,
      'stock.quantity': stockQuantity,
    } = req.body;

    let imageUrl = image;

    if (req.file) {
      imageUrl = `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`;
    }

    const quantity = stockQuantity ? parseInt(stockQuantity, 10) : 0;

    const updateProductService = new UpdateProductService();

    const product = await updateProductService.execute(product_id, {
      name,
      price,
      brand,
      description,
      material,
      universe,
      inactiveReason,
      depth,
      height,
      weight,
      width,
      quantity,
      categoryIsAvailable,
      image: imageUrl,
    });

    return res.json(product);
  }
}

export { UpdateProductController };
