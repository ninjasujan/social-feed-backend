import { Sequelize } from 'sequelize';
import { Sequelize as SequelizeType } from 'sequelize/types';
import Locals from './Locals';
import dotenv from 'dotenv';
import path from 'path/posix';
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

export class Database {
  /**
   * Initializing the database
   */
  public static init = async () => {
    try {
      const { DATABASE_NAME, DATABASE_HOST, DIALECT, USER_NAME, PASSWORD } =
        Locals.config();

      const sequelize = new Sequelize(DATABASE_NAME, USER_NAME, PASSWORD, {
        host: DATABASE_HOST,
        dialect: DIALECT,
      });

      await sequelize.authenticate();
      console.log('[Postgres database connected]');
    } catch (error) {
      console.error('[Unable to connect to the database]', error);
    }
  };
}
