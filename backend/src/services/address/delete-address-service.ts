import { DeleteAddressDb } from '../../config/database/address/delete-address-db';

class DeleteAddressService {
  private deleteAddressDb: DeleteAddressDb;

  constructor() {
    this.deleteAddressDb = new DeleteAddressDb();
  }

  async execute(address_id: string) {
    if (!address_id) {
      throw new Error('ID do endereço não encontrado!');
    }

    try {
      const address = await this.deleteAddressDb.deleteAddress(address_id);

      return address;
    } catch (error) {
      console.error('Erro ao deletar endereço');

      throw new Error('Erro ao deletar endereço');
    }
  }
}

export { DeleteAddressService };
