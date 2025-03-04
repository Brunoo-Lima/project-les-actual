import { Request, Response } from 'express';
import { IProduct } from '../../types/IProduct';
import { CreateProductService } from '../../services/product/create-product-service';

class CreateProductController {
  async handle(req: Request, res: Response) {
    const {
      category,
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
    }: IProduct = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'Nenhuma imagem enviada.' });
    }

    // Gera a URL da imagem
    const imageUrl = `${req.protocol}://${req.get('host')}/images/${
      req.file.filename
    }`;

    const createProductService = new CreateProductService();

    const createProduct = await createProductService.execute({
      category,
      image: imageUrl,
      name,
      price,
      brand,
      description,
      material,
      universe,
      inactiveReason,
      isAvailable: true,
      depth,
      height,
      weight,
      width,
    });

    return res.status(201).json(createProduct);
  }
}

export { CreateProductController };
