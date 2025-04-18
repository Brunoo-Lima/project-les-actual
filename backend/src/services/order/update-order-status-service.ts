import {
  StatusOrder,
  UpdateOrderStatusDb,
} from '../../config/database/order/update-order-status-db';

class UpdateOrderStatusService {
  private updateOrderStatusDb: UpdateOrderStatusDb;

  constructor() {
    this.updateOrderStatusDb = new UpdateOrderStatusDb();
  }

  async execute(orderId: string, newStatus: StatusOrder) {
    if (!orderId) {
      throw new Error('Pedido não encontrado');
    }

    if (!newStatus) {
      throw new Error('Status do pedido obrigatório');
    }

    try {
      const order = await this.updateOrderStatusDb.updateOrderStatus(
        orderId,
        newStatus
      );
      return order;
    } catch (error) {
      console.error('Erro ao aprovar pedido:', error);
      throw new Error('Erro ao aprovar pedido');
    }
  }
}

export { UpdateOrderStatusService };
