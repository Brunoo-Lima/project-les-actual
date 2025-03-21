import { prismaClient } from '../../config/prisma-client/prisma-client';
import { UpdateStatusProductDb } from '../../config/database/product/update-status-product-db';

interface IProductStatus {
  status: boolean;
  inactiveReason?: string;
}

class UpdateStatusProductService {
  private updateStatusProductDb: UpdateStatusProductDb;

  constructor() {
    this.updateStatusProductDb = new UpdateStatusProductDb();
  }

  async execute(product_id: string, data: IProductStatus) {
    if (!product_id) {
      throw new Error('ID do produto é obrigatório');
    }

    const existingProduct = await prismaClient.product.findUnique({
      where: { id: product_id },
    });

    if (!existingProduct) {
      throw new Error('Produto não encontrado');
    }

    try {
      const product = await this.updateStatusProductDb.updateStatusProduct(
        product_id,
        data
      );

      return { product };
    } catch (error) {
      console.error('Erro ao atualizar o status do produto:', error);
      throw new Error('Erro ao atualizar o status do produto!');
    }
  }
}

export { UpdateStatusProductService };
