import { Router } from 'express';
import { CreateUserController } from '../controllers/user/create-user-controller';

const routes = Router();

routes.post('/user', new CreateUserController().handle);

export { routes };
