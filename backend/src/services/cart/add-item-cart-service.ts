import { prismaClient } from '../../config/prisma-client/prisma-client';
import { ICartItem } from '../../types/ICart';
import { CartValidationService } from '../../validations/cart/cart-validation-service';
import { ProductValidationService } from '../../validations/product/product-validation-service';

class AddCartItemService {
  private productValidationService: ProductValidationService;
  private cartValidationService: CartValidationService;

  constructor() {
    this.productValidationService = new ProductValidationService();
    this.cartValidationService = new CartValidationService();
  }

  private async handleStockUpdate(items: ICartItem[], tx: any) {
    for (const item of items) {
      // Consulta o produto incluindo o estoque
      const product = await tx.product.findUnique({
        where: { id: item.productId },
        include: { stock: true },
      });

      if (!product) {
        throw new Error(`Produto ${item.productId} não encontrado`);
      }
      if (!product.stock) {
        throw new Error(`Produto ${item.productId} sem estoque cadastrado`);
      }

      const availableQuantity = product.stock.quantity - product.stock.reserved;

      if (availableQuantity < item.quantity) {
        throw new Error(
          `Estoque insuficiente para ${product.name}. Disponível: ${availableQuantity}, Solicitado: ${item.quantity}`
        );
      }

      // Atualiza o estoque reservado
      await tx.stock.update({
        where: { id: product.stock.id },
        data: { reserved: { increment: item.quantity } },
      });
    }
  }

  async execute(userId: string, items: ICartItem[]) {
    const existingCart = await this.cartValidationService.getExistingCart(
      userId
    );
    if (!existingCart)
      throw new Error(
        'Carrinho não encontrado - crie um carrinho antes de adicionar itens'
      );

    try {
      return await prismaClient.$transaction(
        async (tx) => {
          this.productValidationService.validateCartItems(items);
          await this.handleStockUpdate(items, tx);

          for (const item of items) {
            await tx.cartItem.upsert({
              where: {
                cartId_productId: {
                  cartId: existingCart.id,
                  productId: item.productId,
                },
              },
              update: { quantity: { increment: item.quantity } },
              create: {
                cartId: existingCart.id,
                productId: item.productId,
                quantity: item.quantity,
              },
            });
          }

          return tx.cart.findUnique({
            where: { id: existingCart.id },
            include: { items: { include: { product: true } } },
          });
        },
        {
          isolationLevel: 'Serializable',
          maxWait: 5000,
          timeout: 10000,
        }
      );
    } catch (error: any) {
      console.error('Erro ao adicionar itens:', error);
      throw new Error(`Falha ao adicionar itens: ${error.message}`);
    }
  }
}

export { AddCartItemService };
