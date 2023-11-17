import { Router, Request, Response } from 'express';
import LeaderboardController from '../Controller/leaderboardsController';

const leaderboardsRouter = Router();

leaderboardsRouter.get('/leaderboard/home', (req: Request, res: Response) => {
  LeaderboardController.getLeaderboard(req, res);
});

export default leaderboardsRouter;
