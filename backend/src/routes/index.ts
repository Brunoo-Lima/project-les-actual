import express from 'express';
import { clientRoutes } from './client.routes';
import { productRoutes } from './product.routes';
import { addressRoutes } from './address.routes';
import { creditCardRoutes } from './credit-card.routes';
import { phoneRoutes } from './phone.routes';
import { loginRoutes } from './login.routes';
import { orderRoutes } from './order.routes';
import { replacementRoutes } from './replacement.routes';

const routes = express.Router();

routes.use(clientRoutes);
routes.use(productRoutes);
routes.use(addressRoutes);
routes.use(creditCardRoutes);
routes.use(phoneRoutes);
routes.use(loginRoutes);
routes.use(orderRoutes);
routes.use(replacementRoutes);

export { routes };
