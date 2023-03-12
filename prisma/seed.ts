import { PrismaClient, Service } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient();
  await prisma.userAccount.createMany({
    data: [
      {
        id: 'user:dse-1',
        service: Service.STRIPE,
        accessToken:
          'sk_test_51Mku9QKK1atT3zxBhioieGkzBcEzOvpWuoVGrcC6BpWB9Wlk48pLZoW6ar501ac3qe8JrQrGOetE1DwciwAeAzCb00hMbGXOI6',
      },
    ],
    skipDuplicates: true, // Skip 'Bobo'
  });
  await prisma.$disconnect();
}

main();
