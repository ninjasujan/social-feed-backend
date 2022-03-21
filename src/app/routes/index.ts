import express, { Router } from 'express';
import v1Route from './v1/index';
const route: Router = express.Router();

route.use('/v1', v1Route);

export default route;
