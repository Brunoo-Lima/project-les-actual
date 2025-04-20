import { Request, Response } from 'express';
import { FilterClientService } from '../../services/client/filter-client-service';

class FilterClientController {
  async handle(req: Request, res: Response) {
    const filters = req.body || {};

    const filterClientService = new FilterClientService();
    const result = await filterClientService.execute(filters);

    return res.status(200).json(result);
  }
}

export { FilterClientController };
