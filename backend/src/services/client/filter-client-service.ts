import {
  FilterClientDb,
  IUserFilter,
} from '../../config/database/client/filter-client-db';

class FilterClientService {
  private filterClientDb: FilterClientDb;

  constructor() {
    this.filterClientDb = new FilterClientDb();
  }

  async execute(filter?: IUserFilter) {
    try {
      const normalizedFilter = filter || {};

      const result = await this.filterClientDb.filterClient(normalizedFilter);

      return result || [];
    } catch (error) {
      console.error('Erro ao filtrar clientes:', error);
      throw new Error(
        `Erro ao filtrar clientes: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
}

export { FilterClientService };
