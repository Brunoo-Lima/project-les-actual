import express from 'express';
import { clientRoutes } from './client.routes';
import { productRoutes } from './product.routes';
import { addressRoutes } from './address.routes';
import { creditCardRoutes } from './credit-card.routes';

const routes = express.Router();

routes.use(clientRoutes);
routes.use(productRoutes);
routes.use(addressRoutes);
routes.use(creditCardRoutes);

export { routes };
