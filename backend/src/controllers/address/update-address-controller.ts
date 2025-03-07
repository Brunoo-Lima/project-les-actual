import { Request, Response } from 'express';
import { IAddress } from '../../types/IUser';
import { UpdateAddressService } from '../../services/address/update-address-service';

class UpdateAddressController {
  async handle(req: Request, res: Response) {
    const address_id = req.query.address_id as string;
    const user_id = req.query.user_id as string;
    const addressData: Partial<IAddress> = req.body;

    const updateAddressService = new UpdateAddressService();

    const updateAddress = await updateAddressService.execute(
      user_id,
      address_id,
      addressData
    );

    return res.status(201).json(updateAddress);
  }
}

export { UpdateAddressController };
