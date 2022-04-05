import express, { Router } from 'express';
import { body, param } from 'express-validator';
const router: Router = express.Router();
import feedActivityController from '@feed-controller/v1/feedactivity.controller';
import inputValidator from '@feed-middleware/validation.middleware';

router.post(
    '/reaction/:postId',
    body('like', 'Please provide reaction status').isBoolean(),
    inputValidator,
    feedActivityController.reactToPost,
);

router.get(
    '/reacted-user/:postId',
    param('postId', 'Please provide valid post id').notEmpty(),
    inputValidator,
    feedActivityController.getReactedUserList,
);

router.post(
    '/comment/:postId',
    [
        body('text', 'Please add valid comment text')
            .isString()
            .isLength({ min: 1, max: 255 })
            .withMessage('Your comment should not exceed more than 255 char'),
        body('parentComment').isNumeric().optional(),
    ],
    inputValidator,
    feedActivityController.commentPost,
);

router.get(
    '/comment/:postId',
    param('postId', 'Please provide valid post id').notEmpty(),
    inputValidator,
    feedActivityController.getCommentByPost,
);

export default router;
