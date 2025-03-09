import { CreatePhoneDb } from '../../config/database/phone/create-phone-db';
import { IPhone } from '../../types/IUser';
import { PhoneValidation } from '../../validations/phone/phone-validation-service';

class CreatePhoneService {
  private createPhoneDb: CreatePhoneDb;
  private validationPhone: PhoneValidation;

  constructor() {
    this.createPhoneDb = new CreatePhoneDb();
    this.validationPhone = new PhoneValidation();
  }

  async execute(user_id: string, phoneData: IPhone) {
    if (!user_id) {
      throw new Error('ID do cliente é obrigatório');
    }

    await this.validationPhone.validateNumberPhone(phoneData.number);

    const validationResult = this.validationPhone.validateNumber(
      phoneData.number
    );

    if (!validationResult.isValid) {
      throw new Error('Número de telefone inválido.');
    }

    try {
      const phone = await this.createPhoneDb.createPhone(user_id, phoneData);

      return { phone };
    } catch (error) {
      console.error('Erro ao criar telefone', error);
      throw new Error('Erro ao criar telefone!');
    }
  }
}

export { CreatePhoneService };
