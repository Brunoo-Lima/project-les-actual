import { prismaClient } from '../../config/prisma-client/prisma-client';

class PhoneValidation {
  async validateNumberPhone(number: string) {
    const numberAlreadyExists = await prismaClient.phone.findFirst({
      where: { number: number },
    });

    if (numberAlreadyExists) {
      throw new Error('Número já cadastrado!');
    }
  }
}

export { PhoneValidation };
