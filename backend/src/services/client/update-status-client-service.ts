import { prismaClient } from '../../config/prisma-client/prisma-client';
import { UpdateStatusClientDb } from '../../config/database/client/update-status-client-db';

interface IUserStatus {
  status: boolean;
  inactiveReason?: string;
}

class UpdateStatusClientService {
  private updateStatusClientDb: UpdateStatusClientDb;

  constructor() {
    this.updateStatusClientDb = new UpdateStatusClientDb();
  }

  async execute(user_id: string, data: IUserStatus) {
    if (!user_id) {
      throw new Error('ID do cliente é obrigatório');
    }

    const existingClient = await prismaClient.user.findUnique({
      where: { id: user_id },
    });

    if (!existingClient) {
      throw new Error('Cliente não encontrado');
    }

    try {
      const client = await this.updateStatusClientDb.updateStatusClient(
        user_id,
        data
      );

      return { client };
    } catch (error) {
      console.error('Erro ao atualizar o status do cliente:', error);
      throw new Error('Erro ao atualizar o status do cliente!');
    }
  }
}

export { UpdateStatusClientService };
