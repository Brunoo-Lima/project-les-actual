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

  async execute(product_id: string, productData: Partial<IProduct>) {
    if (!product_id) {
      throw new Error('Id do produto é obrigatório!');
    }

    this.validationProduct.validateNameProduct(productData.name as string);

    try {
      const product = await this.updateProductDb.updateProduct(
        product_id,
        productData
      );

      return { product };
    } catch (error) {
      console.error('Erro ao atualizar produto!', error);
      throw new Error('Erro ao atualizar produto!');
    }
  }
}

export { UpdateProductService };
