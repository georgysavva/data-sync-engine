import { Request, Response, Router } from 'express';
import { SearchDto } from './dto/search.dto.js';

import { UserDataService } from './user-data.service.js';

export class UserDataController {
  constructor(private service: UserDataService) {}

  async search(req: Request, res: Response): Promise<void> {
    const searchDto = SearchDto.parse(req.query);

    const userData = await this.service.search(req.params.userId, searchDto);
    res.json(userData);
  }

  router(): Router {
    const router = Router({ mergeParams: true });
    router.get('/search', this.search.bind(this));
    return router;
  }
}
