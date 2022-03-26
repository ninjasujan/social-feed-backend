import express, { Router } from 'express';

import authRoute from './auth.route';

const route: Router = express.Router();

route.use('/auth', authRoute);

export default route;
