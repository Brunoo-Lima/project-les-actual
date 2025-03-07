import { hash } from 'bcryptjs';
import { UpdateClientDb } from '../../config/database/client/update-client-db';
import { IUser } from '../../types/IUser';
import { ClientValidationService } from '../../validations/client/client-validation-service';
import { prismaClient } from '../../config/prisma-client/prisma-client';

class UpdateClientService {
  private validationService: ClientValidationService;
  private updateClientDb: UpdateClientDb;

  constructor() {
    this.validationService = new ClientValidationService();
    this.updateClientDb = new UpdateClientDb();
  }

  async execute(user_id: string, data: Partial<IUser>) {
    if (!user_id) {
      throw new Error('ID do cliente é obrigatório');
    }

    const existingClient = await prismaClient.user.findUnique({
      where: { id: user_id },
    });

    if (!existingClient) {
      throw new Error('Cliente não encontrado');
    }

    if (data.email && data.email !== existingClient.email) {
      await this.validationService.validateEmail(data.email, user_id);
    }

    if (data.cpf && data.cpf !== existingClient.cpf) {
      await this.validationService.validateCPF(data.cpf, user_id);
    }

    if (data.password) {
      this.validationService.validatePassword(data.password as string);
    }

    if (data.password && data.confirmPassword) {
      this.validationService.validateConfirmPassword(
        data.password,
        data.confirmPassword
      );
    }

    if (data.password) {
      const passwordHash = await hash(data.password as string, 8);
      data.password = passwordHash;
    }

    try {
      const client = await this.updateClientDb.updateClient(user_id, data);

      return { client };
    } catch (error) {
      console.error('Erro ao atualizar o cliente:', error);
      throw new Error('Erro ao atualizar cliente!');
    }
  }
}

export { UpdateClientService };
