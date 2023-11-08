import { sign, verify } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

export function generateToken(payload: any): string {
  // console.log(payload);
  return sign(payload, secret, { expiresIn: '1d' });
}

export function verifyToken(token: string): any {
  return verify(token, secret);
}
