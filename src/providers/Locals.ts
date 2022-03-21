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
  };
}

class Locals {
  /**
   * Make env available throughout your application runtime
   */
  public static config: IConfig = () => {
    const ENVIRONMENT = process.env.ENVIRONMENT || 'dev';
    const PORT = process.env.PORT || 4000;
    const API_SECRET =
      process.env.TOKEN_SECRET || 'This is your responsibility!';
    const DATABASE_NAME = process.env.DATABASE_NAME || '';
    const USER_NAME = process.env.USER_NAME || '';
    const PASSWORD = process.env.PASSWORD || '';
    const DATABASE_HOST = process.env.DATABASE_HOST || '';
    const DIALECT = (process.env.DIALECT as Dialect) || 'postgres';

    return {
      ENVIRONMENT,
      PORT,
      API_SECRET,
      DATABASE_NAME,
      USER_NAME,
      PASSWORD,
      DATABASE_HOST,
      DIALECT,
    };
  };
}

export default Locals;
