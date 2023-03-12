/*
  Warnings:

  - Added the required column `userAccountId` to the `HubSpotContact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userAccountId` to the `StripeCustomer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HubSpotContact" ADD COLUMN     "userAccountId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "StripeCustomer" ADD COLUMN     "userAccountId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "HubSpotContact-userAccountId" ON "HubSpotContact"("userAccountId");

-- CreateIndex
CREATE INDEX "StripeCustomer-userAccountId" ON "StripeCustomer"("userAccountId");

-- AddForeignKey
ALTER TABLE "StripeCustomer" ADD CONSTRAINT "StripeCustomer_userAccountId_fkey" FOREIGN KEY ("userAccountId") REFERENCES "UserAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HubSpotContact" ADD CONSTRAINT "HubSpotContact_userAccountId_fkey" FOREIGN KEY ("userAccountId") REFERENCES "UserAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
