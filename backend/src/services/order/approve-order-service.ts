import { ApproveOrderDb } from '../../config/database/order/approve-order-db';

class ApproveOrderService {
  private approveOrderDb: ApproveOrderDb;

  constructor() {
    this.approveOrderDb = new ApproveOrderDb();
  }

  async execute(orderId: string) {
    try {
      const order = await this.approveOrderDb.approveOrder(orderId);
      return order;
    } catch (error) {
      console.error('Erro ao aprovar pedido:', error);
      throw new Error('Erro ao aprovar pedido');
    }
  }
}

export { ApproveOrderService };
