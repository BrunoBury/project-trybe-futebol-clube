import InterfaceUserLogin from '../Interfaces/InterfaceUsersLogin';
import SequelizeUserModel from '../database/models/userLoginModel';

export default class UserModel {
  static async authLoginUser(
    email: string,
    password: string,
  ): Promise<InterfaceUserLogin | undefined> {
    const user = await SequelizeUserModel.findOne({ where: { email, password } });
    if (!user) {
      return undefined;
    }

    return user.toJSON() as InterfaceUserLogin;
  }
}
