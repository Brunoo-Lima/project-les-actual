import express from 'express';
import { clientRoutes } from './client.routes';

const routes = express.Router();

routes.use(clientRoutes);

export { routes };
