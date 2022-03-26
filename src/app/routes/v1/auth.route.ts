import express, { Router } from 'express';
import { body } from 'express-validator';
import inputValidator from '../../middleware/validation.middleware';
import authController from '../../controller/v1/auth.controller';

const router: Router = express.Router();

router.post(
  '/signup',
  [
    body('userName', 'Please provide valid email').isString().isEmail(),
    body('password', 'Please provide valid password')
      .isString()
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 char long'),
  ],
  inputValidator,
  authController.userSignUp,
);

export default router;
