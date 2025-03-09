import { Request, Response } from 'express';
import { IPhone } from '../../types/IUser';
import { UpdatePhoneService } from '../../services/phone/update-phone-service';

class UpdatePhoneController {
  async handle(req: Request, res: Response) {
    const user_id = req.query.user_id as string;
    const phone_id = req.query.phone_id as string;
    const phoneData: Partial<IPhone> = req.body;

    const updatePhoneService = new UpdatePhoneService();

    const phone = await updatePhoneService.execute(
      user_id,
      phone_id,
      phoneData
    );

    return res.json(phone);
  }
}

export { UpdatePhoneController };
