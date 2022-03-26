import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import path from 'path/posix';
import Locals from './Locals';
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

class Database {
  /**
   * Initializing the database
   */

  public static sequelize: Sequelize;

  public static init = async () => {
    try {
      const { DATABASE_NAME, DATABASE_HOST, DIALECT, USER_NAME, PASSWORD } =
        Locals.config();

      Database.sequelize = new Sequelize(DATABASE_NAME, USER_NAME, PASSWORD, {
        host: DATABASE_HOST,
        dialect: DIALECT,
      });
      await Database.sequelize.authenticate();
      // eslint-disable-next-line no-console
      console.log('[Postgres database connected]');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[Unable to connect to the database]', error);
    }
  };
}

export default Database;
