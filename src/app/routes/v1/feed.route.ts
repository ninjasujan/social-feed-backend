import express, { Router } from 'express';
import { body } from 'express-validator';
import multer from 'multer';
import path from 'path';
import inputValidator from '@feed-middleware/validation.middleware';
import feedController from '@feed-controller/v1/feed.controller';
import { postType, postTypeError } from '@feed-constants/feed.constant';

const tempFilePath = path.join(__dirname, '..', '..', '..', 'temp');
const uploadstrategy = multer({ dest: tempFilePath });

const router: Router = express.Router();

router.post(
    '/create',
    uploadstrategy.array('attachment'),
    [
        body('caption', 'Please provide valid caption').isString().optional(),
        body('location', 'Please provide valid location').isString().optional(),
        body('type', postTypeError).isString().isIn(Object.values(postType)),
        body('userTag', 'Please provide valid user tag list')
            .isArray({
                min: 0,
            })
            .optional(),
        body('hashTag', 'Please provide valid hash tags list')
            .isArray()
            .optional(),
    ],
    inputValidator,
    feedController.createFeed,
);

router.get('/', feedController.getUserFeeds);

export default router;
