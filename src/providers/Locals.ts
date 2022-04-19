import { Dialect } from 'sequelize';

interface IConfig {
    (): {
        ENVIRONMENT: string;
        PORT: string | number;
        API_SECRET: string;
        DATABASE_NAME: string;
        USER_NAME: string;
        PASSWORD: string;
        DATABASE_HOST: string;
        DIALECT: Dialect;
        AWS_ACCESS_KEY: string;
        AWS_SECRET_KEY: string;
        AWS_BUCKET_NAME: string;
    };
}

class Locals {
    /**
     * Make env available throughout your application runtime
     */
    public static config: IConfig = () => {
        const ENVIRONMENT = process.env.ENVIRONMENT || 'DEV';
        const PORT = process.env.PORT || 4000;
        const API_SECRET =
            process.env.TOKEN_SECRET || 'This is your responsibility!';
        const DATABASE_NAME = process.env.DATABASE_NAME || '';
        const USER_NAME = process.env.USER_NAME || '';
        const PASSWORD = process.env.PASSWORD || '';
        const DATABASE_HOST = process.env.DATABASE_HOST || '';
        const DIALECT = (process.env.DIALECT as Dialect) || 'postgres';
        const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY || '';
        const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY || '';
        const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME || '';
        return {
            ENVIRONMENT,
            PORT,
            API_SECRET,
            DATABASE_NAME,
            USER_NAME,
            PASSWORD,
            DATABASE_HOST,
            DIALECT,
            AWS_ACCESS_KEY,
            AWS_SECRET_KEY,
            AWS_BUCKET_NAME,
        };
    };
}

export default Locals;
