import { prismaClient } from '../../config/prisma-client/prisma-client';
import { ICartItem } from '../../types/ICart';
import { CartValidationService } from '../../validations/cart/cart-validation-service';

class RemoveFromCartService {
  private cartValidationService: CartValidationService;

  constructor() {
    this.cartValidationService = new CartValidationService();
  }

  private async handleStockRestore(items: ICartItem[], tx: any) {
    for (const item of items) {
      const product = await tx.product.findUnique({
        where: { id: item.productId },
        include: { stock: true },
      });

      if (!product) throw new Error(`Produto ${item.productId} não encontrado`);
      if (!product.stock)
        throw new Error(`Produto ${item.productId} sem estoque`);

      await tx.stock.update({
        where: { id: product.stock.id },
        data: {
          quantity: { increment: item.quantity },
          reserved: { decrement: item.quantity },
        },
      });
    }
  }

  async removeItems(userId: string, itemsToRemove: ICartItem[]) {
    const existingCart = await this.cartValidationService.getExistingCart(
      userId
    );
    if (!existingCart) throw new Error('Carrinho não encontrado');

    try {
      return await prismaClient.$transaction(async (tx) => {
        // Primeiro, obtemos os itens atuais do carrinho para verificar as quantidades
        const currentItems = await tx.cartItem.findMany({
          where: {
            cartId: existingCart.id,
            productId: { in: itemsToRemove.map((item) => item.productId) },
          },
        });

        // Validamos se os itens existem no carrinho e se as quantidades são válidas
        const validatedItems = itemsToRemove.map((itemToRemove) => {
          const existingItem = currentItems.find(
            (item) => item.productId === itemToRemove.productId
          );

          if (!existingItem) {
            throw new Error(
              `Produto ${itemToRemove.productId} não encontrado no carrinho`
            );
          }

          if (itemToRemove.quantity > existingItem.quantity) {
            throw new Error(
              `Quantidade a remover (${itemToRemove.quantity}) maior que a quantidade no carrinho (${existingItem.quantity}) para o produto ${itemToRemove.productId}`
            );
          }

          return {
            productId: itemToRemove.productId,
            quantity: itemToRemove.quantity,
          };
        });

        // Restauramos o estoque
        await this.handleStockRestore(validatedItems, tx);

        // Atualizamos ou removemos os itens do carrinho
        for (const item of validatedItems) {
          const existingItem = currentItems.find(
            (i) => i.productId === item.productId
          );

          if (existingItem && existingItem.quantity > item.quantity) {
            // Se a quantidade a remover for menor que a quantidade no carrinho, apenas decrementamos
            await tx.cartItem.update({
              where: {
                cartId_productId: {
                  cartId: existingCart.id,
                  productId: item.productId,
                },
              },
              data: { quantity: { decrement: item.quantity } },
            });
          } else {
            // Se for igual ou maior, removemos o item completamente
            await tx.cartItem.delete({
              where: {
                cartId_productId: {
                  cartId: existingCart.id,
                  productId: item.productId,
                },
              },
            });
          }
        }

        return tx.cart.findUnique({
          where: { id: existingCart.id },
          include: { items: { include: { product: true } } },
        });
      });
    } catch (error: any) {
      console.error('Transaction error:', error);
      throw error; // Re-lança o erro para ser capturado pelo controller
    }
  }
}

export { RemoveFromCartService };
