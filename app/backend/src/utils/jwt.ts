import { sign, verify } from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export function generateToken(payload: any): string {
  // console.log(payload);
  return sign(payload, secret, { expiresIn: '1d' });
}

export function verifyToken(token: string): any {
  // console.log({ token });
  // console.log(verify('', ''));
  const result = verify(token, secret);
  // console.log({ result });
  // return verify(token, secret);
  return result as any;
}
