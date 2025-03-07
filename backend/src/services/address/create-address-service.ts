import { CreateAddressDb } from '../../config/database/address/create-address-db';
import { IAddress } from '../../types/IUser';

class CreateAddressService {
  private createAddressDb: CreateAddressDb;

  constructor() {
    this.createAddressDb = new CreateAddressDb();
  }

  async execute(user_id: string, addressData: { addresses: IAddress[] }) {
    if (!user_id) {
      throw new Error('ID do cliente é obrigatório');
    }

    try {
      const address = await this.createAddressDb.createAddress(
        user_id,
        addressData
      );

      return { address };
    } catch (error) {
      console.error('Erro ao criar endereço:', error);
      throw new Error('Erro ao criar endereço!');
    }
  }
}

export { CreateAddressService };
