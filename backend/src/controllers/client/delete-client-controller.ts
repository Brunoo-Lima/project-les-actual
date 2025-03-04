import { Request, Response } from 'express';
import { DeleteClientService } from '../../services/client/delete-client-service';

class DeleteClientController {
  async handle(req: Request, res: Response) {
    const id = req.query.user_id as string;

    const deleteClientService = new DeleteClientService();

    const deleteClient = await deleteClientService.execute(id);

    return res.json(deleteClient);
  }
}

export { DeleteClientController };
