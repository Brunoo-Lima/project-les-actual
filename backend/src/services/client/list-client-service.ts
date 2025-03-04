import { ListClientDb } from '../../config/database/client/list-client-db';

class ListClientService {
  private listClientDb: ListClientDb;

  constructor() {
    this.listClientDb = new ListClientDb();
  }

  async execute() {
    if (!this.listClientDb) {
      throw new Error('Erro ao listar clientes');
    }

    return await this.listClientDb.listClient();
  }
}

export { ListClientService };
