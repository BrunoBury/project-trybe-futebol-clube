import { Model, QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (QueryInterface: QueryInterface) => {
    await QueryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },
  down: async (QueryInterface: QueryInterface) => {
    await QueryInterface.dropTable('users');
  },
};
