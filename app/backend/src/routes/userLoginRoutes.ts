import { Router, Request, Response } from 'express';
import emailValidationMiddleware from '../middleware/emailValidationMiddleware';
import userLoginController from '../Controller/userLoginController';

const userLoginRouter = Router();

userLoginRouter.post(
  '/login',
  emailValidationMiddleware,
  (req: Request, res: Response) => userLoginController.authenticateUser(req, res),
);

export default userLoginRouter;
