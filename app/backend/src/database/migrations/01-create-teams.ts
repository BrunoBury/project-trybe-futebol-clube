import { Model, QueryInterface, DataTypes } from 'sequelize';
import Teams from '../../Interfaces/Teams';

export default{
    up:async (QueryInterface: QueryInterface) => {
        await QueryInterface.createTable('teams', {
            id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            teamName:{
                type: DataTypes.STRING,
                allowNull: false,
                field: 'team_name',
            },
        })
    },
    down: async (QueryInterface: QueryInterface) => {
        await QueryInterface.dropTable('teams');
    }
}