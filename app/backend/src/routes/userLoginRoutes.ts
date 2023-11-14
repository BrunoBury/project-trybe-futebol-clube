import { Router, Request, Response } from 'express';
import validateTokenMiddleware from '../middleware/validateTokenMiddleware';
import emailValidationMiddleware from '../middleware/emailValidationMiddleware';
import userLoginController from '../Controller/userLoginController';

const userLoginRouter = Router();

userLoginRouter.post(
  '/login',
  emailValidationMiddleware,
  (req: Request, res: Response) => userLoginController.authenticateUser(req, res),
);

userLoginRouter.get(
  '/login/role',
  validateTokenMiddleware,
  (req: Request, res: Response) => userLoginController.getRole(req, res),
);

export default userLoginRouter;
