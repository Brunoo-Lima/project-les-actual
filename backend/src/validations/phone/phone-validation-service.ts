import { prismaClient } from '../../config/prisma-client/prisma-client';

class PhoneValidation {
  async validateNumberPhone(number: string, phone_id?: string) {
    const numberAlreadyExists = await prismaClient.phone.findFirst({
      where: { number, id: { not: phone_id } },
    });

    if (numberAlreadyExists) throw new Error('Número já cadastrado!');
  }

  validateNumber(number: string): {
    isValid: boolean;
    type?: 'Fixo' | 'Móvel';
  } {
    const cleanedNumber = number.replace(/\D/g, '');

    if (cleanedNumber.length < 10 || cleanedNumber.length > 11) {
      return { isValid: false };
    }

    if (cleanedNumber.length === 10) {
      const isValidFixed = /^[1-9]{2}[2-5]\d{7}$/.test(cleanedNumber);
      return { isValid: isValidFixed, type: isValidFixed ? 'Fixo' : undefined };
    }

    if (cleanedNumber.length === 11) {
      const isValidMobile = /^[1-9]{2}9\d{8}$/.test(cleanedNumber);
      return {
        isValid: isValidMobile,
        type: isValidMobile ? 'Móvel' : undefined,
      };
    }

    return { isValid: false };
  }
}

export { PhoneValidation };
