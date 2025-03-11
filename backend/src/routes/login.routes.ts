import { Router } from 'express';
import { AuthClientController } from '../controllers/authentication/auth-client-controller';

const loginRoutes = Router();

loginRoutes.post('/login', async (req, res) => {
  const authClientController = new AuthClientController();
  await authClientController.handle(req, res);
});

export { loginRoutes };
