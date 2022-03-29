import Database from '@feed-providers/Database';
import Express from '@feed-providers/Express';

class App {
    /** Load Server */
    public loadServer(): void {
        /** Initiate Express server */
        Express.init();
    }

    /** Load Database */
    public loadDatabase(): void {
        Database.init();
    }
}

export default new App();
