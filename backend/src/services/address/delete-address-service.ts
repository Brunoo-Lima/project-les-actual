import { DeleteAddressDb } from '../../config/database/address/delete-address-db';
import { AddressValidationService } from '../../validations/address/address-validation-service';

class DeleteAddressService {
  private deleteAddressDb: DeleteAddressDb;
  private validationService: AddressValidationService;

  constructor() {
    this.deleteAddressDb = new DeleteAddressDb();
    this.validationService = new AddressValidationService();
  }

  async execute(address_id: string, user_id: string) {
    if (!address_id) {
      throw new Error('ID do endereço não encontrado!');
    }

    await this.validationService.canDeleteAddress(user_id, address_id);

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
