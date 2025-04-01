import { CreateCartDb } from '../../config/database/order/create-cart-db';
import { ICart } from '../../types/ICart';
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

  async execute(userId: string, cart: Omit<ICart, 'userId'>) {
    await this.orderValidationService.validationExistingCart(userId);

    await this.productValidationService.validateStockProduct(cart.items);

    this.productValidationService.validateCartItems(cart.items);

    try {
      const cartData = await this.createCartDb.createCart(userId, {
        items: cart.items,
      });

      console.log('cartData', cartData);

      return { cartData };
    } catch (error: any) {
      console.error('Erro ao criar carrinho:', error);
      throw new Error('Falha ao criar carrinho: ' + error.message);
    }
  }
}

export { CreateCartService };
