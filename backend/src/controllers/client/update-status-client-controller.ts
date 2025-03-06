import { Request, Response } from 'express';
import { UpdateStatusClientService } from '../../services/client/update-status-client-service';

interface IUserStatus {
  status: boolean;
  inactiveReason?: string;
}
class UpdateStatusClientController {
  async handle(req: Request, res: Response) {
    const user_id = req.query.user_id as string;
    const { status, inactiveReason }: IUserStatus = req.body;

    const updateStatusClientService = new UpdateStatusClientService();

    const updateStatusClient = await updateStatusClientService.execute(
      user_id as string,
      {
        status,
        inactiveReason,
      }
    );

    return res.status(201).json(updateStatusClient);
  }
}

export { UpdateStatusClientController };
