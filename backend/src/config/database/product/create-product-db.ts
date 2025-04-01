import { CategoryIsAvailable, IProduct } from '../../../types/IProduct';
import { prismaClient } from '../../prisma-client/prisma-client';

class CreateProductDb {
  async createProduct({
    image,
    name,
    price,
    brand,
    description,
    material,
    universe,
    inactiveReason,
    categoryIsAvailable = CategoryIsAvailable.EM_ESTOQUE,
    depth,
    height,
    weight,
    width,
    quantity,
  }: IProduct) {
    return await prismaClient.product.create({
      data: {
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
        isAvailable: true,
        categoryIsAvailable: categoryIsAvailable,
        stock: {
          create: {
            quantity: quantity,
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
        categoryIsAvailable: true,
        inactiveReason: true,
        depth: true,
        height: true,
        weight: true,
        width: true,
        stock: {
          select: {
            quantity: true,
          },
        },
        created_at: true,
        updated_at: true,
      },
    });
  }
}

export { CreateProductDb };
