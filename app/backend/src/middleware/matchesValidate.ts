import { Request, Response } from 'express';
import SequelizeTeamModel from '../database/models/teamModel';

export default async function checkTeams(req: Request, res: Response, next: any) {
  const { homeTeamId, awayTeamId } = req.body;

  if (homeTeamId === awayTeamId) {
    return res.status(422).json({
      message: 'It is not possible to create a match with two equal teams' });
  }

  try {
    const homeTeamExists = await SequelizeTeamModel.findByPk(homeTeamId);
    const awayTeamExists = await SequelizeTeamModel.findByPk(awayTeamId);

    if (!homeTeamExists || !awayTeamExists) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error checking teams' });
  }
}
