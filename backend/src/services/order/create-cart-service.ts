import { CreateCartDb } from '../../config/database/order/create-cart-db';
import { prismaClient } from '../../config/prisma-client/prisma-client';
import { ICart, ICartItem } from '../../types/ICart';
import { OrderValidationService } from '../../validations/order/order-validation-service';
import { ProductValidationService } from '../../validations/product/product-validation-service';

class CreateCartService {
  private createCartDb: CreateCartDb;
  private productValidationService: ProductValidationService;
  private orderValidationService: OrderValidationService;

  constructor() {
    this.createCartDb = new CreateCartDb();
    this.productValidationService = new ProductValidationService();
    this.orderValidationService = new OrderValidationService();
  }

  //Olhar dps aqui nao sei se ta certo
  private async addItemsToCart(userId: string, newItems: ICartItem[]) {
    const existingCart = await this.orderValidationService.getExistingCart(
      userId
    );
    if (!existingCart) throw new Error('Carrinho não encontrado');

    try {
      // Tudo dentro da transação para garantir atomicidade
      const updatedCart = await prismaClient.$transaction(async (tx) => {
        // 1. Valida estoque (dentro da transação)
        await this.productValidationService.validateStockProduct(newItems, tx); // Note o 'tx'
        this.productValidationService.validateCartItems(newItems);

        // 2. Atualiza itens do carrinho E estoque
        for (const item of newItems) {
          // 2.1. Adiciona ao carrinho
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

          // 2.2. Atualiza estoque (importante!)
          await tx.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                create: {
                  quantity: item.quantity,
                },
              },
            },
          });
        }

        // 3. Retorna o carrinho atualizado
        return tx.cart.findUnique({
          where: { id: existingCart.id },
          include: { items: { include: { product: true } } },
        });
      });

      return { cartData: updatedCart };
    } catch (error: any) {
      console.error('Erro na transação:', error);
      throw new Error(`Falha ao atualizar carrinho: ${error.message}`);
    }
  }
  async execute(userId: string, cart: Omit<ICart, 'userId'>) {
    const existingCart = await this.orderValidationService.getExistingCart(
      userId
    );

    if (existingCart) {
      return await this.addItemsToCart(userId, cart.items);
    }

    try {
      const cartData = await prismaClient.$transaction(async (tx) => {
        await this.productValidationService.validateStockProduct(
          cart.items,
          tx
        );
        this.productValidationService.validateCartItems(cart.items);

        const newCart = await tx.cart.create({
          data: {
            userId,
            items: {
              create: cart.items.map((item) => ({
                productId: item.productId,
                quantity: item.quantity,
              })),
            },
          },
          include: { items: { include: { product: true } } },
        });

        for (const item of cart.items) {
          await tx.product.update({
            where: { id: item.productId },
            data: {
              stock: {
                create: {
                  quantity: item.quantity,
                },
              },
            },
          });
        }

        return newCart;
      });

      return { cartData };
    } catch (error: any) {
      console.error('Erro ao criar carrinho:', error);
      throw new Error('Falha ao criar carrinho: ' + error.message);
    }
  }
}

export { CreateCartService };
