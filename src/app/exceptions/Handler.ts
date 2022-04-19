import { UnauthorizedError } from 'express-jwt';
import { NextFunction, Request, Response } from 'express';
import APIError from './APIError';
import ValidatioError from './ValidationError';
import { EagerLoadingError } from 'sequelize';

class Handler {
    public static errorHandler(
        error: APIError | ValidatioError | UnauthorizedError | Error,
        req: Request,
        res: Response,
        next: NextFunction,
    ): any {
        console.log(error);
        if (error instanceof APIError) {
            return res.status(error.status).json({
                status: 'APIError',
                message: error.message,
            });
        }
        if (error instanceof ValidatioError) {
            return res.status(error.status).json({
                status: 'ValidationError',
                message: error.message,
            });
        }
        if (error instanceof EagerLoadingError) {
            return res.status(500).json({
                status: 'SequelizeError',
                message: error.message,
            });
        }
        if (error instanceof UnauthorizedError) {
            return res.status(error.status).json({
                status: 'UnauthorizedError',
                message: error.message,
            });
        }
        res.status(500).json({
            status: 'InternalServerError',
            message: error?.message,
        });
        next();
    }
}

export default Handler;
