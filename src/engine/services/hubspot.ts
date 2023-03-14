import { PrismaClient, UserAccount } from '@prisma/client';
import { RateLimiterMemory } from 'rate-limiter-flexible';

import { Client } from '@hubspot/api-client';
export class HubspotWorker {
  private apiRateLimiter: RateLimiterMemory;

  constructor(private db: PrismaClient) {
    // Use the daily limit of 250,000 API calls because it's more strict than the burst one of 100 per 10 seconds.
    this.apiRateLimiter = new RateLimiterMemory({
      points: 250000,
      duration: 86400,
      execEvenly: true,
    });
  }
  async sync(userAccount: UserAccount): Promise<void> {
    console.log(
      `Start syncing Hubspot contacts; userAccount=${userAccount.id}`,
    );
    // Disable built-in rate limiter because we have our own.
    const hubspotClient = new Client({
      accessToken: userAccount.accessToken,
      limiterOptions: null,
    });

    let after = undefined;
    let pageNumber = 1;
    let totalSynced = 0;
    do {
      await this.apiRateLimiter.consume(userAccount.id, 1);
      console.log(
        `Syncing Hubspot contacts page; userAccount=${userAccount.id}, page=${pageNumber}`,
      );
      const contactsResponse =
        await hubspotClient.crm.contacts.basicApi.getPage(100, after);
      const contacts = contactsResponse.results.map((contactData) => {
        return {
          id: contactData.id,
          email: contactData.properties.email,
          userAccountId: userAccount.id,
          data: JSON.parse(JSON.stringify(contactData)),
        };
      });

      await this.db.hubSpotContact.createMany({
        data: contacts,
        skipDuplicates: true,
      });

      after = contactsResponse?.paging?.next?.after;
      pageNumber += 1;
      totalSynced += contacts.length;
    } while (after);

    console.log(
      `Finished syncing Hubspot Contacts; userAccount=${userAccount.id}, totalSynced=${totalSynced}`,
    );
  }
}
