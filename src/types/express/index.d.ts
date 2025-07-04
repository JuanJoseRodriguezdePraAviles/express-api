import { JwtPayload } from 'jsonwebtoken';

declare namespace Express {
  interface Request {
    user?: string | JwtPayload;
  }
}