import { Router, Request, Response } from 'express';
import MatchesController from '../Controller/matchesController';

const matchesRouter = Router();

matchesRouter.get('/matches', (req: Request, res: Response) => {
  MatchesController.getAllMatches(req, res);
});

export default matchesRouter;
