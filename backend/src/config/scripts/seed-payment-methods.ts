// src/scripts/seed-payment-methods.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedPaymentMethods() {
  try {
    const result = await prisma.paymentMethod.createMany({
      data: [
        { id: 'credit_card_1', type: 'credit_card' },
        { id: 'pix_1', type: 'pix' },
        { id: 'boleto_1', type: 'boleto' },
        { id: 'coupon_1', type: 'coupon' },
      ],
      skipDuplicates: true,
    });

    console.log('Métodos criados:', result);
  } catch (error) {
    console.error('Erro ao criar métodos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedPaymentMethods();
