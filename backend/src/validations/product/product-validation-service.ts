import { prismaClient } from '../../config/prisma-client/prisma-client';

class ProductValidationService {
  async validateNameProduct(name: string): Promise<void> {
    if (!name) {
      throw new Error('O nome do produto é obrigatório.');
    }

    const productAlreadyExists = await prismaClient.product.findFirst({
      where: {
        name,
      },
    });

    if (productAlreadyExists) {
      throw new Error('Já existe um produto com esse nome.');
    }
  }
}

export { ProductValidationService };
