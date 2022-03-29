import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import ValidatioError from '@feed-exceptions/ValidationError';

const inputValidator = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new ValidatioError(errors);
    }
    next();
};

export default inputValidator;
