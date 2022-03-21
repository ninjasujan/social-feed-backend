import { Database } from './Database';
import Express from './Express';

class App {
  /**
   * Load server
   */
  public loadServer(): void {
    // Initialize express server
    Express.init();
    // initialize socket
  }

  /**
   * Load Database
   */
  public loadDatabase(): void {
    Database.init();
  }
}

export default new App();
