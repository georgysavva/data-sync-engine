import { PrismaClient, UserAccount } from '@prisma/client';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import Stripe from 'stripe';

export class StripeWorker {
  private apiRateLimiter: RateLimiterMemory;

  constructor(private db: PrismaClient) {
    this.apiRateLimiter = new RateLimiterMemory({
      points: 100,
      duration: 1,
      execEvenly: true,
    });
  }
  async sync(userAccount: UserAccount): Promise<void> {
    console.log(
      `Start syncing Stripe customers; userAccount=${userAccount.id}`,
    );
    const stripeClient = new Stripe(userAccount.accessToken, {
      apiVersion: '2022-11-15',
    });

    let startingAfter = undefined;
    let hasMore = true;
    let pageNumber = 1;
    let totalSynced = 0;
    while (hasMore) {
      await this.apiRateLimiter.consume(userAccount.id, 1);
      console.log(
        `Syncing Stripe customers page; userAccount=${userAccount.id}, page=${pageNumber}`,
      );
      const customersResult = await stripeClient.customers.list({
        limit: 100,
        starting_after: startingAfter,
      });
      const customers = customersResult.data.map((customerData) => {
        return {
          id: customerData.id,
          email: customerData.email,
          userAccountId: userAccount.id,
          data: JSON.parse(JSON.stringify(customerData)),
        };
      });

      await this.db.stripeCustomer.createMany({
        data: customers,
        skipDuplicates: true,
      });
      startingAfter = customers[customers.length - 1].id;
      hasMore = customersResult.has_more;
      pageNumber += 1;
      totalSynced += customers.length;
    }
    console.log(
      `Finished syncing Stripe customers; userAccount=${userAccount.id}  totalSynced=${totalSynced}`,
    );
  }
}
