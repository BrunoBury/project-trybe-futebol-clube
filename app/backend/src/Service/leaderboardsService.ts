import TeamModel from '../Models/teamsModel';
import MatchesModel from '../Models/matchesModel';
import Team from '../Interfaces/InterfaceTeams';
import { InterfaceMatches } from '../Interfaces/interfaceMatches';
import { LeaderboardsTeam } from '../Interfaces/leaderboardsTeam';

export default class LeaderboardService {
  static async getLeaderboardStats(): Promise<LeaderboardsTeam[]> {
    try {
      const teams: Team[] = await TeamModel.getAllTeams();
      const completedMatches: InterfaceMatches[] = await MatchesModel.getAllMatches();

      const leaderboardStats: LeaderboardsTeam[] = teams.map((team) => {
        const teamMatches = completedMatches.filter(
          (match) => match.homeTeamId === team.id || match.awayTeamId === team.id,
        );

        return this.calculateTeamStats(team, teamMatches);
      });

      return leaderboardStats;
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching leaderboard data');
    }
  }

  private static calculateTeamStats(team: Team, matches: InterfaceMatches[]): LeaderboardsTeam {
    const totalGames = matches.length;
    const totalVictories = this.calculateTotalVictories(team.id, matches);
    const totalDraws = this.calculateTotalDraws(matches);
    const totalLosses = totalGames - (totalVictories + totalDraws);
    const goalsFavor = this.calculateGoalsFavor(team.id, matches);
    const goalsOwn = this.calculateGoalsOwn(team.id, matches);
    const totalPoints = totalVictories * 3 + totalDraws;

    return {
      name: team.teamName,
      totalPoints,
      totalGames,
      totalVictories,
      totalDraws,
      totalLosses,
      goalsFavor,
      goalsOwn,
    };
  }

  private static calculateTotalVictories(teamId: number, matches: InterfaceMatches[]): number {
    return matches.filter(
      (match) => match.homeTeamId === teamId && match.homeTeamGoals > match.awayTeamGoals,
    ).length;
  }

  private static calculateTotalDraws(matches: InterfaceMatches[]): number {
    return matches.filter(
      (match) => match.homeTeamGoals === match.awayTeamGoals,
    ).length;
  }

  private static calculateGoalsFavor(teamId: number, matches: InterfaceMatches[]): number {
    return matches.reduce(
      (acc, match) =>
        (match.homeTeamId === teamId ? acc + match.homeTeamGoals : acc + match.awayTeamGoals),
      0,
    );
  }

  private static calculateGoalsOwn(teamId: number, matches: InterfaceMatches[]): number {
    return matches.reduce(
      (acc, match) =>
        (match.homeTeamId === teamId ? acc + match.awayTeamGoals : acc + match.homeTeamGoals),
      0,
    );
  }
}
