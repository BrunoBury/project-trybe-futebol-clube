import { Request, Response } from 'express';
import MatchesService from '../Service/matchesService';

export default class MatchesController {
  static async getAllMatches(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;

    try {
      if (inProgress === 'true' || inProgress === 'false') {
        const matches = await MatchesService.getMatchesByStatus(inProgress === 'true');
        res.status(200).json(matches);
      } else {
        const matches = await MatchesService.getAllMatches();
        res.status(200).json(matches);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async finishMatch(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const success = await MatchesService.finishMatch(Number(id));

      if (success) {
        res.status(200).json({ message: 'Finished' });
      } else {
        res.status(404).json({ error: 'Partida não encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
