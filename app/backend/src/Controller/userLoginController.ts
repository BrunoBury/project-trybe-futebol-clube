import { Request, Response } from 'express';
import UserLoginService from '../Service/userLoginService';
import { generateToken } from '../utils/jwt';

function createUserPayload(user: any) {
  return {
    id: user.dataValues.id,
    username: user.dataValues.username,
    role: user.dataValues.role,
    email: user.dataValues.email,
  };
}

function createErrorResponse(res: Response, statusCode: number, message: string) {
  return res.status(statusCode).json({ message });
}

async function handleSuccessfulLogin(req: Request, res: Response, email: string, password: string) {
  const user = await UserLoginService.authenticateUser(email, password);

  if (user) {
    const payload = createUserPayload(user);
    const token = generateToken(payload);
    res.status(200).json({ token });
  } else {
    createErrorResponse(res, 401, 'Invalid email or password');
  }
}

export default class UserLoginController {
  static async authenticateUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body as any;

      if (!email) {
        createErrorResponse(res, 400, 'All fields must be filled');
        return;
      }

      if (!password) {
        createErrorResponse(res, 400, 'All fields must be filled');
        return;
      }

      await handleSuccessfulLogin(req, res, email, password);
    } catch (error: any) {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  }

  static async getRole(req: Request, res: Response) {
    const { payload } = req.body;
    const { email } = payload;
    const role = await UserLoginService.getRole(email);
    return res.status(200).json({ role });
  }
}
