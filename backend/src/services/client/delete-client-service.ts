import { DeleteClientDb } from '../../config/database/client/delete-client-db';

class DeleteClientService {
  private deleteClientDb: DeleteClientDb;

  constructor() {
    this.deleteClientDb = new DeleteClientDb();
  }

  async execute(user_id: string) {
    if (!user_id) {
      throw new Error('ID do usuário é obrigatório');
    }

    const client = await this.deleteClientDb.deleteClient(user_id);

    if (!client) {
      throw new Error('Cliente não encontrado');
    }

    return client;
  }
}

export { DeleteClientService };
