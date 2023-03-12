-- CreateTable
CREATE TABLE "UserAccount" (
    "id" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,

    CONSTRAINT "UserAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeCustomer" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "StripeCustomer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HubSpotContact" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "HubSpotContact_pkey" PRIMARY KEY ("id")
);
