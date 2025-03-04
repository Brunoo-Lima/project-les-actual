import express, { Router } from 'express';
import { CreateProductController } from '../controllers/product/create-product-controller';
import path from 'path';
import multer from 'multer';
import uploadsConfig from '../config/multer';

const productRoutes = Router();

productRoutes.use(
  '/images',
  express.static(path.join(__dirname, '..', '..', 'uploads'))
);

const upload = multer(uploadsConfig);

productRoutes.post('/product', upload.single('image'), async (req, res) => {
  const createProductController = new CreateProductController();
  await createProductController.handle(req, res);
});

export { productRoutes };
