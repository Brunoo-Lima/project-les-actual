import express from 'express';
import { clientRoutes } from './client.routes';
import { productRoutes } from './product.routes';
import { addressRoutes } from './address.routes';
import { creditCardRoutes } from './credit-card.routes';
import { phoneRoutes } from './phone.routes';

const routes = express.Router();

routes.use(clientRoutes);
routes.use(productRoutes);
routes.use(addressRoutes);
routes.use(creditCardRoutes);
routes.use(phoneRoutes);

export { routes };
