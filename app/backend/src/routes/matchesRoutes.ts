import { Router, Request, Response } from 'express';

const matchesRouter = Router();

matchesRouter.get('/matches', (req: Request, res: Response) => {
  res.send('Matches');
});

export default matchesRouter;
