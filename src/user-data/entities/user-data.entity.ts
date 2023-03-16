import { HubspotContact, Service, StripeCustomer } from '@prisma/client';

export class UserDataEntity {
  service: Service;
  record: HubspotContact | StripeCustomer;
}
