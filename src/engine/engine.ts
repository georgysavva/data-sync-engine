import { PrismaClient, Service } from '@prisma/client';
import { HubspotWorker } from './services/hubspot.js';
import { StripeWorker } from './services/stripe.js';

export class Engine {
  constructor(
    private db: PrismaClient,
    private stripeWorker: StripeWorker,
    private hubspotWorker: HubspotWorker,
  ) {}

  async sync(): Promise<void> {
    const userAccounts = await this.db.userAccount.findMany();
    for (const userAccount of userAccounts) {
      if (userAccount.service === Service.STRIPE) {
        await this.stripeWorker.sync(userAccount);
      } else if (userAccount.service === Service.HUBSPOT) {
        await this.hubspotWorker.sync(userAccount);
      }
    }
  }
}
