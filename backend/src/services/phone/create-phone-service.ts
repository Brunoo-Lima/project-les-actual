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

  async execute(user_id: string, iphoneData: IPhone) {
    if (!user_id) {
      throw new Error('ID do cliente é obrigatório');
    }

    await this.validationPhone.validateNumberPhone(iphoneData.number);

    try {
      const phone = await this.createPhoneDb.createPhone(user_id, iphoneData);

      return { phone };
    } catch (error) {
      console.error('Erro ao criar telefone', error);
      throw new Error('Erro ao criar telefone!');
    }
  }
}

export { CreatePhoneService };
