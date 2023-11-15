export interface InterfaceMatches {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam: {
    teamName: string;
  } | null;
  awayTeam: {
    teamName: string;
  } | null;
}
