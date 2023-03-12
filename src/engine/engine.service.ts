import { PrismaClient, Service } from '@prisma/client';
import { StripeWorker } from './services/stripe.js';

export class Engine {
  constructor(private db: PrismaClient, private stripeWorker: StripeWorker) {}

  async sync(): Promise<void> {
    const userAccounts = await this.db.userAccount.findMany();
    for (const userAccount of userAccounts) {
      if (userAccount.service === Service.STRIPE) {
        await this.stripeWorker.sync(userAccount);
      }
    }
  }
}
