import { Request, Response } from 'express';
import TeamService from '../Service/teamService';

export default class TeamController {
  static async getAllTeams(req: Request, res: Response) {
    try {
      const teams = await TeamService.getAllTeams();
      res.status(200).json(teams);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getTeamById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const team = await TeamService.getTeamById(Number(id));
      res.status(200).json(team);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
