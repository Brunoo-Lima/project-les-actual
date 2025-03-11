import { AuthValidationService } from '../../validations/auth/auth-validation';

class AuthClientService {
  private authValidationService: AuthValidationService;

  constructor() {
    this.authValidationService = new AuthValidationService();
  }
  async execute(email: string, password: string, role: 'CLIENT' | 'ADMIN') {
    try {
      const client = await this.authValidationService.validationLogin(
        email,
        password,
        role
      );
      return client;
    } catch (error) {
      console.log('Erro ao realizar login', error);
      throw new Error('Erro ao realizar login');
    }
  }
}

export { AuthClientService };
