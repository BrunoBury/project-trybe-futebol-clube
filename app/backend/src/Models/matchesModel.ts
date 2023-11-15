import { InterfaceMatches } from '../Interfaces/interfaceMatches';
import SequelizeMatchesModel from '../database/models/matchesModel';

export default class MatchesModel {
  static async getAllMatches(): Promise<InterfaceMatches[]> {
    const matches = await SequelizeMatchesModel.findAll({
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
}
