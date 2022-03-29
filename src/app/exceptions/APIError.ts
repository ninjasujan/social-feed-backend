class APIError extends Error {
    public status: number = 400;
    constructor(message: string, statusCode: number) {
        super(message);
        Object.setPrototypeOf(this, APIError.prototype);
        this.status = statusCode;
    }
}

export default APIError;
