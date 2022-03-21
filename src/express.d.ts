interface JWTUser {
  _id: string;
}
declare namespace Express {
  export interface Request {
    user: JWTUser;
  }
}
