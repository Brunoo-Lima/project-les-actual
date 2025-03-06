import { Request, Response } from 'express';
import { CreateClientService } from '../../services/client/create-client-service';
import { IUser } from '../../types/IUser';

class CreateClientController {
  async handle(req: Request, res: Response) {
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
      status = true,
    }: IUser = req.body;

    const createClientService = new CreateClientService();

    const createClient = await createClientService.execute({
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
      status,
    });

    return res.status(201).json(createClient);
  }
}

export { CreateClientController };
