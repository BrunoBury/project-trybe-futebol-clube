import interfaceUsers from '../Interfaces/InterfaceUsers';
import SequelizeUserModel from '../database/models/userModel';

export default class UserModel {
  static async getAllUsers(): Promise<interfaceUsers[]> {
    const allUsers = await SequelizeUserModel.findAll();
    return allUsers.map((user) => user.toJSON() as interfaceUsers);
  }

  static async getUserById(id: number): Promise<interfaceUsers | undefined> {
    const user = await SequelizeUserModel.findByPk(id);

    if (!user) {
      return undefined;
    }

    return user.toJSON() as interfaceUsers;
  }

  static async createUser(email: string, password: string): Promise<interfaceUsers> {
    const user = await SequelizeUserModel.create({
      email,
      password,
      username: '',
      role: '',
    });
    return user.toJSON() as interfaceUsers;
  }

  static async findUserByEmail(email: string): Promise<interfaceUsers | null> {
    const user = await SequelizeUserModel.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    return user.toJSON() as interfaceUsers;
  }
}
