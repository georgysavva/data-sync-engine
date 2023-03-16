import { Request, Response, Router } from 'express';

import { UsersService } from './users.service.js';

export class UsersController {
  constructor(private service: UsersService) {}

  async list(_req: Request, res: Response): Promise<void> {
    const users = await this.service.list();
    res.json(users);
  }

  router(userDataRouter: Router): Router {
    const router = Router({ mergeParams: true });
    router.get('/', this.list.bind(this));
    router.use('/:userId/data', userDataRouter);
    return router;
  }
}
