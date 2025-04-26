import { ListCouponsDb } from '../../config/database/coupons/list-coupons-db';

class ListCouponsService {
  private listCouponDb: ListCouponsDb;

  constructor() {
    this.listCouponDb = new ListCouponsDb();
  }

  async execute(userId: string) {
    if (!userId) {
      throw new Error('Usuário não encontrado');
    }

    try {
      await this.listCouponDb.listCoupons(userId);
    } catch (error) {
      console.error('Erro ao listar cupons', error);
      throw new Error('Erro ao listar cupons');
    }
  }
}

export { ListCouponsService };
