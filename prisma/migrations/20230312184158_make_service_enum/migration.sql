/*
  Warnings:

  - Changed the type of `service` on the `UserAccount` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Service" AS ENUM ('STRIPE', 'HUBSPOT');

-- AlterTable
ALTER TABLE "UserAccount" DROP COLUMN "service",
ADD COLUMN     "service" "Service" NOT NULL;
