import { CreateAddressDb } from '../../config/database/address/create-address-db';
import { IAddress } from '../../types/IUser';
import { AddressValidationService } from '../../validations/address/address-validation-service';

class CreateAddressService {
  private createAddressDb: CreateAddressDb;
  private validationService: AddressValidationService;

  constructor() {
    this.createAddressDb = new CreateAddressDb();
    this.validationService = new AddressValidationService();
  }

  async execute(user_id: string, address: IAddress) {
    if (!user_id) {
      throw new Error('ID do cliente é obrigatório');
    }

    await this.validationService.validateZipCode(address.zipCode, user_id);
    await this.validationService.validateAddress(user_id, address, address.id);

    try {
      const createAddress = await this.createAddressDb.createAddress(
        user_id,
        address
      );

      return { createAddress };
    } catch (error) {
      console.error('Erro ao criar endereço:', error);
      throw new Error('Erro ao criar endereço!');
    }
  }
}

export { CreateAddressService };
