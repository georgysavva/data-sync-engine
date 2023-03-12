import { PrismaClient, UserAccount } from '@prisma/client';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import Stripe from 'stripe';

export class StripeWorker {
  private apiRateLimiter: RateLimiterMemory;

  constructor(private db: PrismaClient) {
    this.apiRateLimiter = new RateLimiterMemory({
      points: 100, // 6 points
      duration: 1, // Per second
      execEvenly: true,
    });
  }
  async sync(userAccount: UserAccount): Promise<void> {
    const stripeClient = new Stripe(userAccount.accessToken, {
      apiVersion: '2022-11-15',
    });
    await this.apiRateLimiter.consume(userAccount.id, 1);
    const customers = await stripeClient.customers.list({ limit: 100 });
    console.log('customers', customers);
    await this.db.stripeCustomer.findMany();
    // return await this.prisma.task.findUniqueOrThrow({ where: { id } });
  }
}
