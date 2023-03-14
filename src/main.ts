import { PrismaClient } from '@prisma/client';
import express from 'express';
import { Engine } from './engine/engine.js';
import { HubspotWorker } from './engine/services/hubspot.js';
import { StripeWorker } from './engine/services/stripe.js';

async function main(): Promise<void> {
  const app = express();
  app.use(express.json());
  const db = new PrismaClient();
  const stripeWorker = new StripeWorker(db);
  const hubspotWorker = new HubspotWorker(db);
  const engine = new Engine(db, stripeWorker, hubspotWorker);

  app.post('/sync', async (_req, res) => {
    await engine.sync();
    res.json({ message: 'success' });
  });

  const port = 3000;
  app.listen(port, () => {
    return console.log(`Express is listening at http://0.0.0.0:${port}`);
  });
}

main();
