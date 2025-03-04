import { DetailClientDb } from '../../config/database/client/detail-client-db';
import { IUser } from '../../types/IUser';

class DetailClientService {
  private detailClientDb: DetailClientDb;

  constructor() {
    this.detailClientDb = new DetailClientDb();
  }

  async execute(user_id: string) {
    if (!user_id) {
      throw new Error('ID do cliente é obrigatório');
    }

    const client = await this.detailClientDb.detailClient(user_id);

    if (!client) {
      throw new Error('Cliente não encontrado');
    }

    return client;
  }
}

export { DetailClientService };
