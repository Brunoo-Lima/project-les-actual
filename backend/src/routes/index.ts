import express from 'express';
import { clientRoutes } from './client.routes';
import { productRoutes } from './product.routes';

const routes = express.Router();

routes.use(clientRoutes);
routes.use(productRoutes);

export { routes };
