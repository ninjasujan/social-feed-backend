import express, { Router } from 'express';

import authRoute from './auth.route';
import feedRoute from './feed.route';

const route: Router = express.Router();

route.use('/auth', authRoute);
route.use('/feed', feedRoute);

export default route;
