import { UpdateProductDb } from '../../config/database/product/update-product-db';
import { IProduct } from '../../types/IProduct';
import { ProductValidationService } from '../../validations/product/product-validation-service';

class UpdateProductService {
  private updateProductDb: UpdateProductDb;
  private validationProduct: ProductValidationService;

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
    }: Partial<IProduct>
  ) {
    if (!product_id) {
      throw new Error('Id do produto é obrigatório!');
    }

    if (name) {
      this.validationProduct.validateNameProduct(name as string, product_id);
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
