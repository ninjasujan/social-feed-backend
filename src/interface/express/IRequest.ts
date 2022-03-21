import { Request } from 'express';

interface JWTUser {
  _id: string;
}

export interface IRequest extends Request {
  user: JWTUser;
}
