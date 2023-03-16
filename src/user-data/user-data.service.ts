import { Prisma, PrismaClient, Service } from '@prisma/client';
import { SearchDto } from './dto/search.dto.js';
import { UserDataEntity } from './entities/user-data.entity.js';

export class UserDataService {
  constructor(private db: PrismaClient) {}

  async search(
    userId: string,
    searchDto: SearchDto,
  ): Promise<UserDataEntity[]> {
    const user = this.db.userAccount.findUniqueOrThrow({
      where: { id: userId },
    });
    const userDataPrismaArgs = {
      where: {
        email: {
          contains: searchDto.email,
          mode: Prisma.QueryMode.insensitive,
        },
      },
    };

    const hubspotContacts = await user.HubspotContacts(userDataPrismaArgs);
    const stripeCustomers = await user.StripeCustomers(userDataPrismaArgs);
    const userDataEntities = [].concat(
      hubspotContacts.map((v) => ({ service: Service.HUBSPOT, record: v })),
      stripeCustomers.map((v) => ({ service: Service.STRIPE, record: v })),
    );
    return userDataEntities;
  }
}
