import { prismaClient } from '../../config/prisma-client/prisma-client';
import { IUser } from '../../types/IUser';

class ClientValidationService {
  async validateEmail(email: string): Promise<void> {
    if (!email) throw new Error('Email não cadastrado!');

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (userAlreadyExists) throw new Error('Cliente já existe!');
  }

  validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      throw new Error(
        'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.'
      );
    }
  };

  validateConfirmPassword(password: string, confirmPassword: string): void {
    if (password !== confirmPassword) {
      throw new Error('As senhas não coincidem!');
    }
  }

  async validateCPF(cpf: string): Promise<void> {
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        cpf,
      },
    });

    if (userAlreadyExists) throw new Error('CPF já cadastrado!');
  }

  validateAddress(addresses: IUser['addresses']): void {
    if (addresses.length === 0) {
      throw new Error('Pelo menos um endereço é obrigatório!');
    }

    const hasValidAddress = addresses.some(
      (address) => address.charge || address.delivery
    );

    if (!hasValidAddress) {
      throw new Error(
        'Pelo menos um endereço de entrega ou de cobrança é obrigatório!'
      );
    }

    addresses.forEach((address, index) => {
      if (address.charge || address.delivery) {
        addresses.forEach((addr, i) => {
          if (i !== index) {
            if (address.charge) addr.charge = false;
            if (address.delivery) addr.delivery = false;
          }
        });
      }
    });
  }

  validatePhones(phones: IUser['phones']): void {
    if (phones.length === 0) {
      throw new Error('Pelo menos um telefone é obrigatório!');
    }
  }

  validateCreditCards(creditCards: IUser['creditCards']): void {
    if (creditCards.length === 0) {
      throw new Error('Pelo menos um cartão de crédito é obrigatório!');
    }

    const preferentialCreditCards = creditCards.filter(
      (creditCard) => creditCard.preferential
    );

    if (preferentialCreditCards.length !== 1) {
      throw new Error(
        'Pelo menos um cartão de crédito preferencial é obrigatório!'
      );
    }

    creditCards.forEach((creditCard, index) => {
      if (creditCard.preferential) {
        creditCards.forEach((card, i) => {
          if (i !== index) {
            card.preferential = false;
          }
        });
      }
    });
  }
}

export { ClientValidationService };
