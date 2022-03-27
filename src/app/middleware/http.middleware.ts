import express, { Application } from 'express';
import cors from 'cors';
import compress from 'compression';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path/posix';
import expressJwt from 'express-jwt';
import hemlet from 'helmet';
import Locals from '../../providers/Locals';

class Http {
  public static mount(_express: Application): Application {
    const publicKey = fs.readFileSync(
      path.join(__dirname, '..', '..', 'secrets', 'public.pem'),
    );
    _express.disable('x-powered-by');
    _express.use(cors());
    _express.use(hemlet());
    _express.use(compress());
    _express.use(express.json());
    _express.use(express.urlencoded({ extended: true }));
    _express.use(
      expressJwt({
        secret: publicKey,
        algorithms: ['RS256'],
      }).unless({
        path: [
          { url: '/api/v1/auth/login', method: ['POST'] },
          { url: '/api/v1/auth/signup', method: ['POST'] },
        ],
      }),
    );

    if (Locals.config().ENVIRONMENT === 'DEV') {
      _express.use(morgan('dev'));
    }
    if (Locals.config().ENVIRONMENT === 'prod') {
      /* eslint-disable-next-line no-console */
      console.log = () => {};
    }
    return _express;
  }
}

export default Http;
