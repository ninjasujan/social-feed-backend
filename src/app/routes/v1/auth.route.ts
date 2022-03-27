import express, { Router } from 'express';
import { body } from 'express-validator';
import {
  userNameError,
  userNameRange,
  passwordRange,
  passwordError,
} from '../../../constants/auth.constant';
import inputValidator from '../../middleware/validation.middleware';
import authController from '../../controller/v1/auth.controller';

const router: Router = express.Router();

router.post(
  '/signup',
  [
    body('userName', userNameError).isString().isLength(userNameRange),
    body('password', 'Please provide valid password')
      .isString()
      .isLength(passwordRange)
      .withMessage(passwordError),
  ],
  inputValidator,
  authController.userSignUp,
);

router.post(
  '/login',
  [
    body('userName', 'Please provide valid email').isString().isEmail(),
    body('password', 'Please provide valid password')
      .isString()
      .isLength(passwordRange)
      .withMessage(passwordError),
  ],
  inputValidator,
  authController.userLogin,
);

export default router;
