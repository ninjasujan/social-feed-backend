import express, { Router } from 'express';
import { body } from 'express-validator';
import {
    userNameError,
    userNameRange,
    passwordRange,
    passwordError,
} from '@feed-constants/auth.constant';
import inputValidator from '@feed-middleware/validation.middleware';
import authController from '@feed-controller/v1/auth.controller';

const router: Router = express.Router();

router.post(
    '/signup',
    [
        body('userName', userNameError).isString().isLength(userNameRange),
        body('password', 'Please provide valid password')
            .isString()
            .isLength(passwordRange)
            .withMessage(passwordError),
        body('profileImage', 'Please provide valid profile image url')
            .isURL()
            .optional(),
    ],
    inputValidator,
    authController.userSignUp,
);

router.post(
    '/login',
    [
        body('userName', userNameError).isString().isLength(userNameRange),
        body('password', 'Please provide valid password')
            .isString()
            .isLength(passwordRange)
            .withMessage(passwordError),
    ],
    inputValidator,
    authController.userLogin,
);

export default router;
