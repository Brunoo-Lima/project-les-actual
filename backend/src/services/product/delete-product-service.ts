import { DeleteProductDb } from '../../config/database/product/delete-product-db';

class DeleteProductService {
  private deleteProductDb: DeleteProductDb;

  constructor() {
    this.deleteProductDb = new DeleteProductDb();
  }

  async execute(product_id: string) {
    try {
      const deleteProduct = await this.deleteProductDb.deleteProduct(
        product_id
      );

      return { deleteProduct };
    } catch (error) {
      console.error('Erro ao deletar produto!', error);
      throw new Error('Erro ao deletar produto!');
    }
  }
}

export { DeleteProductService };
