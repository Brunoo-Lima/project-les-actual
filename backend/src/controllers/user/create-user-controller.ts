import { Request, Response } from 'express';
import { CreateUserService } from '../../services/user/create-user-service';
import { IUser } from '../../types/IUser';

class CreateUserController {
  async handle(req: Request, res: Response) {
    const {
      name,
      email,
      password,
      cpf,
      dateOfBirth,
      gender,
      addresses,
      phones,
      creditCards,
    }: IUser = req.body;

    const createUserService = new CreateUserService();
    const createUser = await createUserService.execute({
      name,
      email,
      password,
      cpf,
      dateOfBirth,
      gender,
      addresses,
      phones,
      creditCards,
    });

    res.json(createUser);
  }
}

export { CreateUserController };
