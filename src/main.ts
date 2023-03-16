import { PrismaClient } from '@prisma/client';
import express from 'express';
import { EngineController } from './engine/engine.controller.js';
import { EngineService } from './engine/engine.service.js';
import { HubspotWorker } from './engine/workers/hubspot.js';
import { StripeWorker } from './engine/workers/stripe.js';
import { UserDataController } from './user-data/user-data.controller.js';
import { UserDataService } from './user-data/user-data.service.js';
import { UsersController } from './users/users.controller.js';
import { UsersService } from './users/users.service.js';

async function main(): Promise<void> {
  const app = express();
  app.use(express.json());

  const prisma = new PrismaClient();

  const stripeWorker = new StripeWorker(prisma);
  const hubspotWorker = new HubspotWorker(prisma);
  const engineService = new EngineService(prisma, stripeWorker, hubspotWorker);
  const engineController = new EngineController(engineService);
  const engineRouter = engineController.router();
  app.use('/engine', engineRouter);

  const userDataService = new UserDataService(prisma);
  const userDataController = new UserDataController(userDataService);
  const userDataRouter = userDataController.router();

  const usersService = new UsersService(prisma);
  const usersController = new UsersController(usersService);
  const usersRouter = usersController.router(userDataRouter);
  app.use('/users', usersRouter);

  const port = 3000;
  app.listen(port, () => {
    return console.log(`Express is listening at http://0.0.0.0:${port}`);
  });
}

main();
