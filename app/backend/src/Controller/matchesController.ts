import { Request, Response } from 'express';
import MatchesService from '../Service/matchesService';

export default class MatchesController {
  static async getAllMatches(req: Request, res: Response): Promise<void> {
    try {
      const matches = await MatchesService.getAllMatches();
      res.status(200).json(matches);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
