import * as bcrypt from 'bcryptjs';
import SequelizeUserModel from '../database/models/userLoginModel';

export default class userLoginService {
  static async authenticateUser(email: string, password: string) {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const user = await SequelizeUserModel.findOne({ where: { email } });

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    return user;
  }
}
