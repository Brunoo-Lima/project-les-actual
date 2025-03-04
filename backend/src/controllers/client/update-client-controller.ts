import { Request, Response } from 'express';
import { UpdateClientService } from '../../services/client/update-client-service';
import { IUser } from '../../types/IUser';

class UpdateClientController {
  async handle(req: Request, res: Response) {
    const user_id = req.query.user_id as string;
    const {
      name,
      email,
      password,
      confirmPassword,
      cpf,
      dateOfBirth,
      gender,
      addresses,
      phones,
      creditCards,
    }: Partial<IUser> = req.body;

    const updateClientService = new UpdateClientService();

    const updateClient = await updateClientService.execute(user_id as string, {
      name,
      email,
      password,
      confirmPassword,
      cpf,
      dateOfBirth,
      gender,
      addresses,
      phones,
      creditCards,
    });

    return res.status(201).json(updateClient);
  }
}

export { UpdateClientController };
