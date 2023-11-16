import { Model, QueryInterface, DataTypes } from 'sequelize';
import { InterfaceMatches } from '../../Interfaces/interfaceMatches';

export default {
    up: async (QueryInterface: QueryInterface) => {
        await QueryInterface.createTable('matches', {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            homeTeamId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'home_team_id',
            },
            homeTeamGoals: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'home_team_goals',
            },
            awayTeamid: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'away_team_id',
            },
            awayTeamGoals: {
                type: DataTypes.INTEGER,
                allowNull: false,
                field: 'away_team_goals',
            },
            inProgress: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                field: 'in_progress',
            },
        });
    },
    down: async (QueryInterface: QueryInterface) => {
        await QueryInterface.dropTable('matches');
    },
}