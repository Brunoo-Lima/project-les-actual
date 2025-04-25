import { ExchangeStatus } from '../../../config/database/order/exchange-order-db';
import { ListReplacementStatusDb } from '../../../config/database/order/replacement/list-replacement-db';

class ListReplacementStatusService {
  private listReplacementDb: ListReplacementStatusDb;

  constructor() {
    this.listReplacementDb = new ListReplacementStatusDb();
  }

  execute(status: ExchangeStatus) {
    if (!status) throw new Error('Status de troca nao informado');

    try {
      return this.listReplacementDb.listReplacementStatus(status);
    } catch (error) {
      console.error('Erro ao listar pedido de troca', error);
      throw new Error('Erro ao listar pedido de troca');
    }
  }
}

export { ListReplacementStatusService };
