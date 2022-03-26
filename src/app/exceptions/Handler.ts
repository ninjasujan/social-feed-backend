import { UnauthorizedError } from 'express-jwt';
import { NextFunction, Request, Response } from 'express';
import APIError from './APIError';
import ValidatioError from './ValidationError';

class Handler {
  public static errorHandler(
    error: APIError | ValidatioError | UnauthorizedError,
    req: Request,
    res: Response,
    next: NextFunction,
  ): any {
    console.log(error);
    if (error instanceof APIError) {
      res.status(error.status).json({
        status: 'APIError',
        message: error.message,
      });
    } else if (error instanceof ValidatioError) {
      res.status(error.status).json({
        status: 'ValidationError',
        message: error.message,
      });
    } else if (error instanceof UnauthorizedError) {
      res.status(error.status).json({
        status: 'UnauthorizedError',
        message: error.message,
      });
    }
    next();
  }
}

export default Handler;
