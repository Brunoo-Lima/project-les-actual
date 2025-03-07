import express from 'express';
import { clientRoutes } from './client.routes';
import { productRoutes } from './product.routes';
import { addressRoutes } from './address.routes';

const routes = express.Router();

routes.use(clientRoutes);
routes.use(productRoutes);
routes.use(addressRoutes);

export { routes };
