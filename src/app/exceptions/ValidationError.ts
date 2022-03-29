import { Result } from 'express-validator';

class ValidatioError extends Error {
    public status: number = 422;
    constructor(error: Result) {
        super('');
        Object.setPrototypeOf(this, ValidatioError.prototype);
        const errors = error.array();
        let message = errors.reduce(
            (prevValue, currentValue) => `${prevValue}${currentValue.msg} ,`,
            '',
        );
        message = message.slice(0, -2);
        this.message = message;
        this.status = 422;
    }
}

export default ValidatioError;
