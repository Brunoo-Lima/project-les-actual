import { Request, Response } from 'express';
import { IAddress } from '../../types/IUser';
import { CreateAddressService } from '../../services/address/create-address-service';

class CreateAddressController {
  async handle(req: Request, res: Response) {
    const user_id = req.query.user_id as string;
    const addressData: IAddress = req.body;

    const createAddressService = new CreateAddressService();

    const address = await createAddressService.execute(
      user_id as string,
      addressData
    );

    return res.status(201).json(address);
  }
}

export { CreateAddressController };
