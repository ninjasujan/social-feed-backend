import express, { Router } from 'express';
import authRoute from '@feed-routes/v1/auth.route';
import feedRoute from '@feed-routes/v1/feed.route';
import feedActivityRoute from '@feed-routes/v1/feedactivity.route';
const route: Router = express.Router();

route.use('/auth', authRoute);
route.use('/feed', feedRoute);
route.use('/feed-activity', feedActivityRoute);

export default route;
