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

    // Aceita números com 10 ou 11 dígitos
    if (cleanedNumber.length < 10 || cleanedNumber.length > 11) {
      return { isValid: false };
    }

    // Valida fixo (10 dígitos)
    if (cleanedNumber.length === 10) {
      const isValidFixed = /^[1-9]{2}\d{8}$/.test(cleanedNumber); // Aceita qualquer número após o DDD
      return { isValid: isValidFixed, type: isValidFixed ? 'Fixo' : undefined };
    }

    // Valida celular (11 dígitos)
    if (cleanedNumber.length === 11) {
      const isValidMobile = /^[1-9]{2}9\d{8}$/.test(cleanedNumber); // Exige nono dígito como 9
      return {
        isValid: isValidMobile,
        type: isValidMobile ? 'Móvel' : undefined,
      };
    }

    return { isValid: false };
  }
}

export { PhoneValidation };
