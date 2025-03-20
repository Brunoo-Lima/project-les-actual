import { IProduct } from '../../../types/IProduct';
import { prismaClient } from '../../prisma-client/prisma-client';

class UpdateProductDb {
  async updateProduct(
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
      depth,
      height,
      weight,
      width,
      quantity,
    }: Partial<IProduct>
  ) {
    return await prismaClient.product.update({
      where: {
        id: product_id,
      },
      data: {
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
        stock: {
          update: {
            quantity: quantity,
          },
        },
      },
    });
  }
}

export { UpdateProductDb };
