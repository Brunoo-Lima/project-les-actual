import { sign } from 'jsonwebtoken';
import { prismaClient } from '../../config/prisma-client/prisma-client';
import { compare, hash } from 'bcryptjs';

class AuthValidationService {
  async validationLogin(
    email: string,
    password: string,
    role: 'CLIENT' | 'ADMIN'
  ) {
    if (!email || !password) {
      throw new Error('Email e senha obrigatórios');
    }

    if (role !== 'CLIENT' && role !== 'ADMIN') {
      throw new Error('Role inválido. Deve ser CLIENT ou ADMIN.');
    }

    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error('Email ou senha incorretos');
    }

    const passwordHash = await hash(password, 8);

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) {
      throw new Error('Senha incorreta');
    }

    if (!process.env.JWT_SECRET) {
      throw new Error(
        'JWT_SECRET não está definido nas variáveis de ambiente.'
      );
    }

    const token = sign(
      {
        email: user.email,
        role: role,
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '1d',
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: role,
      token,
    };
  }
}

export { AuthValidationService };
