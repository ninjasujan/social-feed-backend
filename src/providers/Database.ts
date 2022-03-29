import { QueryInterface, Sequelize } from 'sequelize';
import { Umzug, UmzugOptions } from 'umzug';
import dotenv from 'dotenv';
import path from 'path/posix';
import Locals from '@feed-providers/Locals';
dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });
import defineModels from '@feed-models/index';

class Database {
    public static sequelize: Sequelize;
    public static umzug: Umzug<QueryInterface>;
    public static init = async () => {
        try {
            const {
                DATABASE_NAME,
                DATABASE_HOST,
                DIALECT,
                USER_NAME,
                PASSWORD,
            } = Locals.config();
            Database.sequelize = new Sequelize(
                DATABASE_NAME,
                USER_NAME,
                PASSWORD,
                {
                    host: DATABASE_HOST,
                    dialect: DIALECT,
                    logging: true,
                },
            );
            await Database.sequelize.authenticate();
            console.log('[Postgres database connected]');
            //   /** Migration setup */
            //   Database.umzug = new Umzug({
            //     migrations: {
            //       glob: `${path.join(__dirname, '..', 'app', 'migration')}/*.js`,
            //     },
            //     context: Database.sequelize.getQueryInterface,
            //     logger: console,
            //   });
            // eslint-disable-next-line no-console

            /** Load Migration script */
            //   await Database.umzug.up();
            // console.log('[Migration script executed]');
            /** Load database models */
            defineModels(Database.sequelize);
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error('[Unable to connect to the database]', error);
        }
    };
}

export default Database;
