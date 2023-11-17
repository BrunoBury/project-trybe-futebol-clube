import { Request, Response } from 'express';
import LeaderboardService from '../Service/leaderboardsService';
import { LeaderboardsTeam } from '../Interfaces/leaderboardsTeam';

export default class LeaderboardController {
  static async getLeaderboard(req: Request, res: Response): Promise<void> {
    try {
      const leaderboardStats: LeaderboardsTeam[] = await LeaderboardService.getLeaderboardStats();
      res.status(200).json(leaderboardStats);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching leaderboard data' });
    }
  }
}
