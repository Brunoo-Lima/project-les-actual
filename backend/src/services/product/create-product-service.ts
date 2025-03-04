import { CreateProductDb } from '../../config/database/product/create-product-db';
import { IProduct } from '../../types/IProduct';
import { ProductValidationService } from '../../validations/product/product-validation-service';

class CreateProductService {
  private createProductDb: CreateProductDb;
  private validationService: ProductValidationService;

  constructor() {
    this.createProductDb = new CreateProductDb();
    this.validationService = new ProductValidationService();
  }

  async execute({
    category,
    image,
    name,
    price,
    brand,
    description,
    material,
    universe,
    inactiveReason,
    depth,
    height,
    weight,
    width,
  }: IProduct) {
    await this.validationService.validateNameProduct(name);

    try {
      const product = await this.createProductDb.createProduct({
        category,
        image,
        name,
        price,
        brand,
        description,
        material,
        universe,
        inactiveReason,
        isAvailable: true,
        depth,
        height,
        weight,
        width,
      });

      return { product };
    } catch (error) {
      console.log('erro ao criar produto');
      throw new Error('Erro ao criar produto!');
    }
  }
}

export { CreateProductService };
