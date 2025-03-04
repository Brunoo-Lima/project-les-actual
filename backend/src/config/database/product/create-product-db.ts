import { IProduct } from '../../../types/IProduct';
import { prismaClient } from '../../prisma-client/prisma-client';

class CreateProductDb {
  async createProduct({
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
    return await prismaClient.product.create({
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
        isAvailable: true,
      },
      select: {
        id: true,
        name: true,
        category: true,
        image: true,
        price: true,
        brand: true,
        description: true,
        material: true,
        universe: true,
        isAvailable: true,
        inactiveReason: true,
        depth: true,
        height: true,
        weight: true,
        width: true,
      },
    });
  }
}

export { CreateProductDb };
