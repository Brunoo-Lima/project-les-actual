import { UpdateProductDb } from '../../config/database/product/update-product-db';
import { prismaClient } from '../../config/prisma-client/prisma-client';
import { CategoryIsAvailable, IProduct } from '../../types/IProduct';
import { ProductValidationService } from '../../validations/product/product-validation-service';

class UpdateProductService {
  private updateProductDb: UpdateProductDb;
  private validationProduct: ProductValidationService;
  private MIN_SALES_VALUE = 10;

  constructor() {
    this.updateProductDb = new UpdateProductDb();
    this.validationProduct = new ProductValidationService();
  }

  async execute(
    product_id: string,
    {
      category,
      image,
      name,
      price,
      brand,
      description,
      material,
      universe,
      inactiveReason,
      isAvailable,
      depth,
      height,
      weight,
      width,
      quantity,
      categoryIsAvailable,
    }: Partial<IProduct>
  ) {
    if (!product_id) {
      throw new Error('Id do produto é obrigatório!');
    }

    if (name) {
      this.validationProduct.validateNameProduct(name as string, product_id);
    }

    if (quantity) {
      this.validationProduct.validateQuantityProduct(quantity);
    }

    const existingProduct = await prismaClient.product.findUnique({
      where: { id: product_id },
      include: {
        orderItems: true,
        stock: true,
      },
    });

    if (!existingProduct) {
      throw new Error('Produto não encontrado');
    }

    if (
      existingProduct.stock?.quantity === 0 &&
      existingProduct.orderItems.reduce(
        (sum: number, sale: any) => sum + sale.price,
        0
      ) < this.MIN_SALES_VALUE
    ) {
      isAvailable = false;
      categoryIsAvailable = CategoryIsAvailable.INDISPONIVEL;
      inactiveReason =
        'Inativado automaticamente por falta de estoque e vendas insuficientes.';
    }

    try {
      const product = await this.updateProductDb.updateProduct(product_id, {
        category,
        image,
        name,
        price,
        brand,
        description,
        material,
        universe,
        inactiveReason,
        isAvailable,
        categoryIsAvailable,
        depth,
        height,
        weight,
        width,
        quantity,
      });

      return { product };
    } catch (error) {
      console.error('Erro ao atualizar produto!', error);
      throw new Error('Erro ao atualizar produto!');
    }
  }
}

export { UpdateProductService };
