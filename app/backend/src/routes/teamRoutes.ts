import { Router, Request, Response } from 'express';
import TeamController from '../Controller/teamController';

const teamRouter = Router();

teamRouter.get('/teams', (req: Request, res: Response) => TeamController.getAllTeams(req, res));

export default teamRouter;
