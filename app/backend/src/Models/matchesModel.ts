import { InterfaceMatches } from '../Interfaces/interfaceMatches';
import SequelizeMatchesModel from '../database/models/matchesModel';

export default class MatchesModel {
  static async getAllMatches(): Promise<InterfaceMatches[]> {
    const matches = await SequelizeMatchesModel.findAll({
      include: ['homeTeam', 'awayTeam'],
    });
    return matches.map((match) => this.formatMatchResponse(match));
  }

  static async getMatchesByStatus(inProgress: boolean): Promise<InterfaceMatches[]> {
    const matches = await SequelizeMatchesModel.findAll({
      where: {
        inProgress,
      },
      include: ['homeTeam', 'awayTeam'],
    });
    return matches.map((match) => this.formatMatchResponse(match));
  }

  private static formatMatchResponse(match: any): InterfaceMatches {
    return {
      id: match.id,
      homeTeamId: match.homeTeamId,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamId: match.awayTeamId,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: match.inProgress,
      homeTeam: match.homeTeam ? { teamName: match.homeTeam.teamName } : null,
      awayTeam: match.awayTeam ? { teamName: match.awayTeam.teamName } : null,
    };
  }

  static async finishMatch(id: number): Promise<boolean> {
    const match = await SequelizeMatchesModel.findByPk(id);

    if (!match) {
      throw new Error('Partida não encontrada');
    }

    match.inProgress = false;
    await match.save();

    return true;
  }

  static async updateMatchResults(
    id: number,
    { homeTeamGoals,
      awayTeamGoals }: any,
  ): Promise<boolean> {
    try {
      const match = await SequelizeMatchesModel.findByPk(id);

      if (!match) {
        throw new Error('Partida não encontrada');
      }

      match.homeTeamGoals = homeTeamGoals;
      match.awayTeamGoals = awayTeamGoals;

      await match.save();

      return true;
    } catch (error : any) {
      throw new Error(`Erro ao atualizar os resultados da partida: ${error.message}`);
    }
  }

  static async createMatchInProgress(matchData: any) {
    const newMatch = await SequelizeMatchesModel.create({
      ...matchData,
      inProgress: true,
    });

    return {
      id: newMatch.id,
      homeTeamId: newMatch.homeTeamId,
      homeTeamGoals: newMatch.homeTeamGoals,
      awayTeamId: newMatch.awayTeamId,
      awayTeamGoals: newMatch.awayTeamGoals,
      inProgress: newMatch.inProgress,
    };
  }
}
