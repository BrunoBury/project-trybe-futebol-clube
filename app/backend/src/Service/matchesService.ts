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
