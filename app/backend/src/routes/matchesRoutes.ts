import { Router, Request, Response } from 'express';
import MatchesController from '../Controller/matchesController';
import validateTokenMiddleware from '../middleware/validateTokenMiddleware';
import checkTeams from '../middleware/matchesValidate';

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

matchesRouter.post(
  '/matches',
  validateTokenMiddleware,
  checkTeams,
  (req: Request, res: Response) => {
    MatchesController.createInProgressMatch(req, res);
  },
);

export default matchesRouter;
