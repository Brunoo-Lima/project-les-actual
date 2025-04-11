import { ListOrdersDb } from '../../config/database/order/list-orders-db';

class ListOrdersService {
  private listOrdersDb: ListOrdersDb;

  constructor() {
    this.listOrdersDb = new ListOrdersDb();
  }

  async execute(userId: string) {
    if (!userId) {
      throw new Error('ID do usuário é obrigatório');
    }

    try {
      const order = await this.listOrdersDb.listOrders(userId);

      return order;
    } catch (error) {
      console.error('Erro ao listar pedidos', error);
      throw new Error('Erro ao listar pedidos');
    }
  }
}

export { ListOrdersService };
