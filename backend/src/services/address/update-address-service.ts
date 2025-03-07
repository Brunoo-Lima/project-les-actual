import { UpdateAddressDb } from '../../config/database/address/update-address-db';
import { prismaClient } from '../../config/prisma-client/prisma-client';
import { IAddress } from '../../types/IUser';
import { AddressValidationService } from '../../validations/address/address-validation-service';

class UpdateAddressService {
  private updateAddressDb: UpdateAddressDb;
  private validationService: AddressValidationService;

  constructor() {
    this.updateAddressDb = new UpdateAddressDb();
    this.validationService = new AddressValidationService();
  }

  async execute(
    user_id: string,
    address_id: string,
    addressData: Partial<IAddress>
  ) {
    if (!user_id) {
      throw new Error('ID do cliente é obrigatório');
    }

    if (!address_id) {
      throw new Error('ID do endereço é obrigatório');
    }

    const address = await prismaClient.address.findFirst({
      where: {
        id: address_id,
        userId: user_id,
      },
    });

    if (!address) {
      throw new Error('Endereço não encontrado para o usuário especificado.');
    }

    await this.validationService.validateAddress(
      user_id,
      addressData as IAddress
    );

    try {
      const updateAddress = await this.updateAddressDb.updateAddress(
        user_id,
        address_id,
        addressData
      );

      return { updateAddress };
    } catch (error) {
      console.error('Erro ao atualizar endereço:', error);
      throw new Error('Erro ao atualizar endereço!');
    }
  }
}

export { UpdateAddressService };
