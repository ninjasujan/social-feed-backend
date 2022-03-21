import express, { Application } from 'express';
import cors from 'cors';
import compress from 'compression';
import morgan from 'morgan';
import expressJwt from 'express-jwt';
import hemlet from 'helmet';
import Locals from '../../providers/Locals';

class Http {
  public static mount(_express: Application): Application {
    _express.disable('x-powered-by');
    _express.use(cors());
    _express.use(hemlet());
    _express.use(compress());
    _express.use(express.json());
    _express.use(express.urlencoded({ extended: true }));
    expressJwt({
      secret: Locals.config().API_SECRET,
      algorithms: ['HS256'],
    }).unless({ path: [{ url: '/api/v1/user/login', method: ['POST'] }] });

    if (Locals.config().ENVIRONMENT === 'dev') {
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
