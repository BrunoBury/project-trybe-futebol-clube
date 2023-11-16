import { Router, Request, Response } from 'express';
import MatchesController from '../Controller/matchesController';
import validateTokenMiddleware from '../middleware/validateTokenMiddleware';

const matchesRouter = Router();

matchesRouter.get('/matches', (req: Request, res: Response) => {
  MatchesController.getAllMatches(req, res);
});

matchesRouter.patch(
  '/matches/:id/finish',
  validateTokenMiddleware,
  (req: Request, res: Response) => {
    MatchesController.finishMatch(req, res);
  },
);

matchesRouter.patch(
  '/matches/:id',
  validateTokenMiddleware,
  (req: Request, res: Response) => {
    MatchesController.updateMatchResults(req, res);
  },
);

export default matchesRouter;
