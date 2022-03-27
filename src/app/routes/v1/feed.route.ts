import express, { Router } from 'express';
import { body } from 'express-validator';
import multer from 'multer';
import path from 'path';
import inputValidator from '../../middleware/validation.middleware';
import feedController from '../../controller/v1/feed.controller';

const tempFilePath = path.join(__dirname, '..', '..', '..', 'temp');
const uploadstrategy = multer({ dest: tempFilePath });

const router: Router = express.Router();

router.post(
  '/create',
  [
    body('caption', 'Please provide valid caption').isString().optional(),
    body('location', 'Please provide valid location').isString().optional(),
  ],
  inputValidator,
  uploadstrategy.array('attachment'),
  feedController.createFeed,
);

router.get('/', feedController.getFeeds);

export default router;
