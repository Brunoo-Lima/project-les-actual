import { Request, Response } from 'express';
import { AuthClientService } from '../../services/authentication/auth-client-service';

class AuthClientController {
  async handle(req: Request, res: Response) {
    const { email, password, role } = req.body;

    const authClientService = new AuthClientService();

    const client = await authClientService.execute(email, password, role);

    return res.json(client);
  }
}

export { AuthClientController };
