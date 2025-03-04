import { Request, Response } from 'express';
import { DetailClientService } from '../../services/client/detail-client-service';

class DetailClientController {
  async handle(req: Request, res: Response) {
    const id = req.query.user_id as string;

    const detailClientService = new DetailClientService();
    const detailClient = await detailClientService.execute(id);

    return res.json(detailClient);
  }
}

export { DetailClientController };
