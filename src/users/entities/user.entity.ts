import { Service, UserAccount } from '@prisma/client';

export class UserEntity implements Partial<UserAccount> {
  id: string;
  service: Service;
}
