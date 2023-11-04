import interfaceTeams from '../Interfaces/InterfaceTeams';
import SequelizeTeamModel from '../database/models/teamModel';

export default class TeamModel {
  static async getAllTeams(): Promise<interfaceTeams[]> {
    const allTeams = await SequelizeTeamModel.findAll();
    return allTeams.map((team) => team.toJSON() as interfaceTeams);
  }
}
