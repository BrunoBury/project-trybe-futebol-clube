import MatchesModel from '../Models/matchesModel';
import { InterfaceMatches } from '../Interfaces/interfaceMatches';

export default class MatchesService {
  static async getAllMatches(): Promise<InterfaceMatches[]> {
    const matches = await MatchesModel.getAllMatches();
    return matches.map((match) => this.formatMatchResponse(match));
  }

  static async getMatchesByStatus(inProgress: boolean): Promise<InterfaceMatches[]> {
    const matches = await MatchesModel.getMatchesByStatus(inProgress);
    return matches.map((match) => this.formatMatchResponse(match));
  }

  static async finishMatch(id: number): Promise<boolean> {
    try {
      const success = await MatchesModel.finishMatch(id);
      return success;
    } catch (error: any) {
      throw new Error(`Erro ao finalizar a partida: ${error.message}`);
    }
  }

  private static formatMatchResponse(match: any): InterfaceMatches {
    return {
      id: match.id,
      homeTeamId: match.homeTeamId,
      homeTeamGoals: match.homeTeamGoals,
      awayTeamId: match.awayTeamId,
      awayTeamGoals: match.awayTeamGoals,
      inProgress: match.inProgress,
      homeTeam: match.homeTeam || null,
      awayTeam: match.awayTeam || null,
    };
  }
}
