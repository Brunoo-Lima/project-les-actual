import { StatusOrder } from '../../../config/database/order/create-order-db';
import { ListReturnProductStatusDb } from '../../../config/database/order/return-product/list-return-product-db';

class ListReturnProductStatusService {
  private listReturnProductDb: ListReturnProductStatusDb;

  constructor() {
    this.listReturnProductDb = new ListReturnProductStatusDb();
  }

  execute(status: StatusOrder) {
    if (!status) throw new Error('Status de devolução não informado');

    try {
      return this.listReturnProductDb.listReturnProductStatus(status);
    } catch (error) {
      console.error('Erro ao listar pedido de devolução', error);
      throw new Error('Erro ao listar pedido de devolução');
    }
  }
}

export { ListReturnProductStatusService };
