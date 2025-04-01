import { IProduct } from '../../../types/IProduct';
import { prismaClient } from '../../prisma-client/prisma-client';

class UpdateProductDb {
  async updateProduct(
    product_id: string,
    {
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
      isAvailable,
      categoryIsAvailable,
    }: Partial<IProduct>
  ) {
    return await prismaClient.product.update({
      where: {
        id: product_id,
      },
      data: {
        image,
        name,
        price,
        brand,
        description,
        material,
        universe,
        inactiveReason,
        categoryIsAvailable,
        isAvailable,
        depth,
        height,
        weight,
        width,
        stock: {
          update: {
            quantity: quantity !== undefined ? quantity : undefined,
          },
        },
      },
      select: {
        id: true,
        name: true,
        image: true,
        price: true,
        brand: true,
        description: true,
        material: true,
        universe: true,
        isAvailable: true,
        inactiveReason: true,
        categoryIsAvailable: true,
        depth: true,
        height: true,
        weight: true,
        width: true,
        stock: {
          select: {
            quantity: true,
          },
        },
      },
    });
  }
}

export { UpdateProductDb };
