import { PrismaClient } from '@prisma/client';

import { UserEntity } from './entities/user.entity.js';

export class UsersService {
  constructor(private db: PrismaClient) {}

  async list(): Promise<UserEntity[]> {
    return await this.db.userAccount.findMany();
  }

}
