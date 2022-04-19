import express, { Router } from 'express';
import { body, param } from 'express-validator';
import multer from 'multer';
import path from 'path';
import inputValidator from '@feed-middleware/validation.middleware';
import feedController from '@feed-controller/v1/feed.controller';
import { postType, postTypeError } from '@feed-constants/feed.constant';
import feedactivityController from '@feed-controller/v1/feedactivity.controller';

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

router.get(
    '/:postId',
    [body('userIds', "Please provide valid user ID's").isArray({ min: 1 })],
    inputValidator,
    feedController.getUserFeed,
);

router.post(
    '/',
    [body('userIds', "Please provide valid user ID's").isArray({ min: 1 })],
    inputValidator,
    feedController.getUsersFeeds,
);

router.get('/hashtag/:hashTag', [
    param('hashTag', 'Please provide valid hashtag').notEmpty(),
    inputValidator,
    feedController.getPostByHashTag,
]);

// router.get('/test', feedactivityController.testApiRoute);

export default router;
