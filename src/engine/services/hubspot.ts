import { PrismaClient, UserAccount } from '@prisma/client';
import { RateLimiterMemory } from 'rate-limiter-flexible';

import * as hubspot from '@hubspot/api-client';

export class HubspotWorker {
  private apiRateLimiter: RateLimiterMemory;

  constructor(private db: PrismaClient) {
    this.apiRateLimiter = new RateLimiterMemory({
      points: 3, // 6 points
      duration: 10, // Per second
      execEvenly: true,
    });
  }
  async sync(userAccount: UserAccount): Promise<void> {
    await this.apiRateLimiter.consume(userAccount.id, 1);
    const hubspotClient = new hubspot.Client({
      accessToken: userAccount.accessToken,
    });
    hubspotClient.crm.contacts.basicApi.getPage();
    await this.db.hubSpotContact.findMany();
  }
}
