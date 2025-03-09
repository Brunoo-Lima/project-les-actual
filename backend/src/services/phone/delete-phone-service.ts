import { DeletePhoneDb } from '../../config/database/phone/delete-phone.db';

class DeletePhoneService {
  private deletePhoneDb: DeletePhoneDb;

  constructor() {
    this.deletePhoneDb = new DeletePhoneDb();
  }

  async execute(phone_id: string) {
    if (!phone_id) {
      throw new Error('ID do telefone é obrigatório!');
    }

    try {
      const phone = await this.deletePhoneDb.deletePhone(phone_id);

      return { phone };
    } catch (error) {
      console.error('Erro ao deletar telefone!');
      throw new Error('Erro ao deletar telefone!');
    }
  }
}

export { DeletePhoneService };
