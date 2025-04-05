import { Prisma } from '@prisma/client';
import { prismaClient } from '../../config/prisma-client/prisma-client';
import { ICart, ICartItem } from '../../types/ICart';

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

  async validateStockProduct(
    items: ICartItem[],
    tx: any = prismaClient
  ): Promise<void> {
    for (const item of items) {
      const product = await tx.product.findUnique({
        where: { id: item.productId },
        select: { stock: true, name: true },
      });

      if (!product) {
        throw new Error(`Produto ${item.productId} não encontrado`);
      }

      if (!product.stock) {
        throw new Error(
          `Produto ${item.productId} não possui estoque registrado`
        );
      }

      if (product.stock.quantity < item.quantity) {
        throw new Error(
          `Estoque insuficiente para o produto ${product.name}. ` +
            `Disponível: ${product.stock.quantity}, Solicitado: ${item.quantity}`
        );
      }
    }
  }

  validateCartItems(cart: ICartItem[]): void {
    cart.forEach((item) => {
      if (item.quantity < 1) {
        throw new Error(`Quantidade inválida para o produto ${item.productId}`);
      }
    });
  }

  async validateStockAndReserve(
    items: ICartItem[],
    tx: Prisma.TransactionClient
  ) {
    for (const item of items) {
      const product = await tx.product.findUnique({
        where: { id: item.productId },
        include: { stock: true },
      });

      if (!product) {
        throw new Error(`Produto ${item.productId} nao encontrado`);
      }

      if (!product.stock) {
        throw new Error(
          `Produto ${item.productId} nao possui estoque registrado`
        );
      }

      // Todas as validações...
      if (product.stock.quantity < item.quantity) {
        throw new Error(`Estoque insuficiente para ${product.name}`);
      }

      // Reserva imediata
      await tx.stock.update({
        where: { id: product.stock.id },
        data: {
          quantity: { decrement: item.quantity },
          reserved: { increment: item.quantity },
        },
      });
    }
  }
}

export { ProductValidationService };
