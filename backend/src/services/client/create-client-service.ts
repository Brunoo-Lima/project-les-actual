import { hash } from 'bcryptjs';

import { IUser } from '../../types/IUser';
import { ClientValidationService } from '../../validations/client/client-validation-service';
import { CreateClientDb } from '../../config/database/client/create-client-db';

class CreateClientService {
  private validationService: ClientValidationService;
  private createClientDb: CreateClientDb;

  constructor() {
    this.validationService = new ClientValidationService();
    this.createClientDb = new CreateClientDb();
  }

  async execute({
    name,
    email,
    password,
    confirmPassword,
    cpf,
    dateOfBirth,
    gender,
    addresses = [],
    phones = [],
    creditCards = [],
  }: IUser) {
    await this.validationService.validateEmail(email);
    await this.validationService.validateCPF(cpf);
    this.validationService.validateAddress(addresses);
    this.validationService.validatePhones(phones);
    this.validationService.validateCreditCards(creditCards);
    this.validationService.validatePassword(password);
    this.validationService.validateConfirmPassword(password, confirmPassword);

    const passwordHash = await hash(password, 8);

    try {
      const client = await this.createClientDb.createClient({
        name,
        email,
        password: passwordHash,
        confirmPassword,
        cpf,
        dateOfBirth,
        gender,
        addresses,
        phones,
        creditCards,
      });

      return { client };
    } catch (error) {
      console.error('Erro ao criar o cliente:', error);
      throw new Error('Erro ao criar o cliente!');
    }
  }
}

export { CreateClientService };
