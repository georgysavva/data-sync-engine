/*
  Warnings:

  - You are about to drop the `HubSpotContact` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "HubSpotContact" DROP CONSTRAINT "HubSpotContact_userAccountId_fkey";

-- DropTable
DROP TABLE "HubSpotContact";

-- CreateTable
CREATE TABLE "HubspotContact" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "userAccountId" TEXT NOT NULL,

    CONSTRAINT "HubspotContact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HubspotContact-userAccountId" ON "HubspotContact"("userAccountId");

-- AddForeignKey
ALTER TABLE "HubspotContact" ADD CONSTRAINT "HubspotContact_userAccountId_fkey" FOREIGN KEY ("userAccountId") REFERENCES "UserAccount"("id") ON DELETE CASCADE ON UPDATE CASCADE;
