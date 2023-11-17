import { Request, Response } from 'express';
import MatchesService from '../Service/matchesService';

const errorServer = 'Internal server error';

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
      res.status(500).json({ error: errorServer });
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
      res.status(500).json({ error: errorServer });
    }
  }

  static async updateMatchResults(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    try {
      const success = await MatchesService.updateMatchResults(Number(id), {
        homeTeamGoals,
        awayTeamGoals,
      });

      if (success) {
        res.status(200).json({ message: 'Resultados da partida atualizados' });
      } else {
        res.status(404).json({ error: 'Partida não encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erro ao atualizar os resultados da partida' });
    }
  }

  static async createInProgressMatch(req: Request, res: Response): Promise<void> {
    const matchData = req.body;

    try {
      const newMatch = await MatchesService.createInProgressMatch(matchData);

      if (newMatch) {
        res.status(201).json(newMatch);
      } else {
        res.status(500).json({ error: 'Erro ao criar a partida' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: errorServer });
    }
  }
}
