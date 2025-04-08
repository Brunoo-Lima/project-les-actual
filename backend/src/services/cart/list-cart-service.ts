import { ListCartDb } from '../../config/database/order/list-cart-db';
import { CartValidationService } from '../../validations/cart/cart-validation-service';

class ListCartService {
  private listCartDb: ListCartDb;
  private cartValidationService: CartValidationService;

  constructor() {
    this.listCartDb = new ListCartDb();
    this.cartValidationService = new CartValidationService();
  }

  async execute(userId: string) {
    if (!userId) throw new Error('ID do usuário é obrigatório');

    try {
      const cart = await this.listCartDb.listCart(userId);

      // Se não existir carrinho ativo
      if (!cart) {
        return {
          userId,
          items: [],
          total: 0,
          totalItems: 0,
          expiresAt: null,
          isActive: false,
        };
      }

      // Calcula totais e formata resposta
      const totals = this.cartValidationService.calculateTotals(cart.items);
      const formattedCart = this.cartValidationService.formatCartResponse(
        cart,
        totals
      );

      return formattedCart;
    } catch (error: any) {
      console.error('Erro ao listar carrinho:', error);
      throw new Error(`Falha ao listar carrinho: ${error.message}`);
    }
  }
}

export { ListCartService };
