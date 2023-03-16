import { Request, Response, Router } from 'express';

import { EngineService } from './engine.service.js';

export class EngineController {
  constructor(private service: EngineService) {}

  async sync(_req: Request, res: Response): Promise<void> {
    await this.service.sync();
    res.json({ ok: true });
  }

  router(): Router {
    const router = Router({ mergeParams: true });
    router.get('/sync', this.sync.bind(this));
    return router;
  }
}
