import { Request, Response, NextFunction } from 'express';

export function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+/;
  return email.match(emailRegex);
}

export default function emailValidationMiddleware(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  if (!isValidEmail(email)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
}
