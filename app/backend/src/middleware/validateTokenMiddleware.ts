import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export default function validateTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  // console.log(req.headers.authorization);
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    res.status(401).json({ message: 'Token not found' });
    return;
  }
  const token = authorizationHeader.split(' ')[1];

  try {
    const payload = verifyToken(token);
    req.body.payload = payload;
    // console.log(req.body);
    next();
  } catch (err) {
    // console.log(err);
    res.status(401).json({ message: 'Token must be a valid token' });
  }
}
