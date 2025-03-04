import { Request, Response } from 'express';
import { ListClientService } from '../../services/client/list-client-service';

class ListClientController {
  async handle(req: Request, res: Response) {
    const listClientService = new ListClientService();
    const listClient = await listClientService.execute();

    return res.json(listClient);
  }
}

export { ListClientController };
