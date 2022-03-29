import http, { Server } from 'http';
import express, { Application } from 'express';
import routes from '@feed-routes/index';
import ExceptionHandler from '@feed-exceptions/Handler';
import httpMiddleware from '@feed-middleware/http.middleware';
import Locals from '@feed-providers/Locals';

class Express {
    public express: Application;
    public server: Server;

    constructor() {
        this.express = express();
        this.mountMiddlewware();
        this.mountRoute();
        this.server = http.createServer(this.express);
    }

    private mountMiddlewware(): void {
        httpMiddleware.mount(this.express);
    }

    public mountRoute(): void {
        this.express.use('/api', routes);
        this.express.use(ExceptionHandler.errorHandler);
    }

    public getExpress(): Server {
        return this.server;
    }

    public init(): void {
        this.server.listen(Locals.config().PORT, () => {
            /* eslint-disable-next-line no-console */
            console.log(
                '\x1b[33m%s\x1b[0m',
                `[Server running on port ${Locals.config().PORT}]`,
            );
        });
    }
}

export default new Express();
