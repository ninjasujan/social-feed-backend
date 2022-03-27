import Database from './Database';
import Express from './Express';
import Config from './Config';

class App {
  /** Load Server */
  public loadServer(): void {
    /** Initiate Express server */
    Express.init();
    /** Initialize configs */
    Config.init();
  }

  /** Load Database */
  public loadDatabase(): void {
    Database.init();
  }
}

export default new App();
