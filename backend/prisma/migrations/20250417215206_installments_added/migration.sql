-- AlterTable
ALTER TABLE "carts" ALTER COLUMN "expires_at" SET DEFAULT (now() + interval '10 min');

-- AlterTable
ALTER TABLE "order_payments" ADD COLUMN     "installmentValue" DECIMAL(65,30),
ADD COLUMN     "installments" INTEGER DEFAULT 1;
