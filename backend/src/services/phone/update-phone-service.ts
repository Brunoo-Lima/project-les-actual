import { UpdatePhoneDb } from '../../config/database/phone/update-phone-db';
import { IPhone } from '../../types/IUser';
import { PhoneValidation } from '../../validations/phone/phone-validation-service';

class UpdatePhoneService {
  private updatePhoneDb: UpdatePhoneDb;
  private validationPhone: PhoneValidation;

  constructor() {
    this.updatePhoneDb = new UpdatePhoneDb();
    this.validationPhone = new PhoneValidation();
  }

  async execute(user_id: string, phone_id: string, phoneData: Partial<IPhone>) {
    if (!user_id) {
      throw new Error('ID do cliente é obrigatório');
    }

    if (!phone_id) {
      throw new Error('ID do telefone é obrigatório');
    }

    if (phoneData.number !== undefined) {
      await this.validationPhone.validateNumberPhone(
        phoneData.number,
        phone_id
      );
    }

    const validationResult = this.validationPhone.validateNumber(
      phoneData.number as string
    );

    if (!validationResult.isValid) {
      throw new Error('Número de telefone inválido.');
    }

    try {
      const phone = await this.updatePhoneDb.updatePhone(
        user_id,
        phone_id,
        phoneData
      );

      return { phone };
    } catch (error) {
      console.error('Erro ao atualizar telefone', error);
      throw new Error('Erro ao atualizar telefone');
    }
  }
}

export { UpdatePhoneService };
