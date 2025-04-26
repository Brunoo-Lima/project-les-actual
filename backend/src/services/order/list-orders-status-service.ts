import { StatusOrder } from '../../config/database/order/create-order-db';
import { ListOrdersStatusDb } from '../../config/database/order/list-orders-status-db';

class ListDetailOrderService {
  private listOrdersStatusDb: ListOrdersStatusDb;

  constructor() {
    this.listOrdersStatusDb = new ListOrdersStatusDb();
  }

  async execute(status?: StatusOrder) {
    if (!status) {
      throw new Error('Status do pedido é obrigatório');
    }

    try {
      const order = await this.listOrdersStatusDb.listOrdersStatus(status);

      return order;
    } catch (error) {
      console.error('Erro ao listar pedido', error);
      throw new Error('Erro ao listar pedido');
    }
  }
}

export { ListDetailOrderService };
