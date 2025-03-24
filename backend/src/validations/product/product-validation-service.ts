import { prismaClient } from '../../config/prisma-client/prisma-client';

class ProductValidationService {
  async validateNameProduct(name: string, product_id?: string): Promise<void> {
    if (!name) {
      throw new Error('O nome do produto é obrigatório.');
    }

    const productAlreadyExists = await prismaClient.product.findFirst({
      where: {
        id: { not: product_id },
        name,
      },
    });

    if (productAlreadyExists) {
      throw new Error('Já existe um produto com esse nome.');
    }
  }

  async validateQuantityProduct(quantity: number): Promise<void> {
    if (quantity <= 0) {
      throw new Error('Quantidade inválida.');
    }
  }
}

export { ProductValidationService };
