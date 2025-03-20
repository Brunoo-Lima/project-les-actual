import { ListProductDb } from '../../config/database/product/list-product-db';

class ListProductService {
  private listProductDb: ListProductDb;

  constructor() {
    this.listProductDb = new ListProductDb();
  }

  async execute() {
    try {
      const products = await this.listProductDb.listProduct();

      return products;
    } catch (error) {
      console.error('Erro ao buscar a lista de produtos!', error);
      throw new Error('Erro ao buscar a lista de produtos!');
    }
  }
}

export { ListProductService };
