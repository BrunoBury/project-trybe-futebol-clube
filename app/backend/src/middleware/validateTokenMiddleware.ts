import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export default function validateTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const token = req.headers.authorization?.split(' ')[1];
  // console.log(req.headers.authorization);
  try {
    if (!token) {
      throw new Error('Token not found');
    }

    const payload = verifyToken(token);
    req.body.payload = payload;
    // console.log(req.body);
    next();
  } catch (err) {
    // console.log(err);
    res.status(401).json({ message: 'Token must be a valid token' });
  }
}
