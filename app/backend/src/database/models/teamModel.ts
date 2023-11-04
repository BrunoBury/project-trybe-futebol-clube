import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';

class SequelizeTeamModel extends
  Model<InferAttributes<SequelizeTeamModel>, InferCreationAttributes<SequelizeTeamModel>> {
  declare id: CreationOptional<number>;
  declare teamName: string;
}
SequelizeTeamModel.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'team_name',
  },
}, {
  sequelize: db,
  modelName: 'Team',
  timestamps: false,
  underscored: true,
});

export default SequelizeTeamModel;
