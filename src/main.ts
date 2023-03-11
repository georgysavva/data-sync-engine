import express from 'express';

import { RateLimiterMemory } from 'rate-limiter-flexible';

export function main(): void {
  const app = express();
  app.use(express.json());

  const rateLimiter = new RateLimiterMemory({
    points: 3, // 6 points
    duration: 10, // Per second
    execEvenly: true,
  });

  app.post('/sync', async (req, res) => {
    console.log(req.body);
    for (let i = 0; i < 5; i++) {
      console.log(i);
      try {
        const res = await rateLimiter.consume('foo', 1);
        console.log('success 1', res);
      } catch (error) {
        console.log('error 1', error);
      }
    }

    res.json({ message: 'success' });
  });

  const port = 3000;
  app.listen(port, () => {
    return console.log(`Express is listening at http://0.0.0.0:${port}`);
  });
}

main();
