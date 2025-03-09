import { Request, Response } from 'express';
import { DeletePhoneService } from '../../services/phone/delete-phone-service';

class DeletePhoneController {
  async handle(req: Request, res: Response) {
    const phone_id = req.query.phone_id as string;

    const deletePhoneService = new DeletePhoneService();

    await deletePhoneService.execute(phone_id);

    return res.json('Telefone excluído com sucesso!');
  }
}

export { DeletePhoneController };
