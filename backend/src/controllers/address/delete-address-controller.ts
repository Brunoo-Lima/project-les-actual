import { Request, Response } from 'express';
import { DeleteAddressService } from '../../services/address/delete-address-service';

class DeleteAddressController {
  async handle(req: Request, res: Response) {
    const address_id = req.query.address_id as string;

    const deleteAddressService = new DeleteAddressService();

    await deleteAddressService.execute(address_id);

    return res.json('Endereço deletado com sucesso!');
  }
}

export { DeleteAddressController };
