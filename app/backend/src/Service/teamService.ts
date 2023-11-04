import TeamModel from '../Models/teamsModel';
import interfaceTeam from '../Interfaces/InterfaceTeams';

export default class TeamService {
  static async getAllTeams(): Promise<interfaceTeam[]> {
    const teams = await TeamModel.getAllTeams();
    return teams;
  }
}
