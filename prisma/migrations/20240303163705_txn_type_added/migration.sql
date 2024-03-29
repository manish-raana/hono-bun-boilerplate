/*
  Warnings:

  - You are about to drop the column `received` on the `Transaction` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TXN_TYPE" AS ENUM ('GAVE', 'GOT');

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "received",
ADD COLUMN     "txnType" "TXN_TYPE" NOT NULL DEFAULT 'GAVE';
