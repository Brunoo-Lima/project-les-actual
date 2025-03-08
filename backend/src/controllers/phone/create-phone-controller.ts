import { Request, Response } from 'express';
import { CreatePhoneService } from '../../services/phone/create-phone-service';
import { IPhone } from '../../types/IUser';

class CreatePhoneController {
  async handle(req: Request, res: Response) {
    const user_id = req.query.user_id as string;
    const iphoneData: IPhone = req.body;

    const createPhoneService = new CreatePhoneService();

    const phone = await createPhoneService.execute(user_id, iphoneData);

    return res.status(201).json(phone);
  }
}

export { CreatePhoneController };
