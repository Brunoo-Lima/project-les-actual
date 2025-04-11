import { ListDetailOrderDb } from '../../config/database/order/list-detail-order-db';

class ListDetailOrderService {
  private listDetailOrderDb: ListDetailOrderDb;

  constructor() {
    this.listDetailOrderDb = new ListDetailOrderDb();
  }

  async execute(userId: string) {
    if (!userId) {
      throw new Error('ID do usuário é obrigatório');
    }

    try {
      const order = await this.listDetailOrderDb.listDetailOrder(userId);

      return order;
    } catch (error) {
      console.error('Erro ao listar pedido', error);
      throw new Error('Erro ao listar pedido');
    }
  }
}

export { ListDetailOrderService };
