-- CreateEnum
CREATE TYPE "ExchangeStatus" AS ENUM ('AGUARDANDO_APROVACAO', 'TROCA_AUTORIZADA', 'DEVOLUCAO_EM_ANDAMENTO', 'PEDIDO_DEVOLVIDO');

-- AlterTable
ALTER TABLE "carts" ALTER COLUMN "expires_at" SET DEFAULT (now() + interval '10 min');

-- CreateTable
CREATE TABLE "exchange_requests" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "items" JSONB NOT NULL,
    "reason" TEXT NOT NULL,
    "status" "ExchangeStatus" NOT NULL,
    "couponId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exchange_requests_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exchange_requests_couponId_key" ON "exchange_requests"("couponId");

-- AddForeignKey
ALTER TABLE "exchange_requests" ADD CONSTRAINT "exchange_requests_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exchange_requests" ADD CONSTRAINT "exchange_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "exchange_requests" ADD CONSTRAINT "exchange_requests_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "exchange_coupons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
