import express, { Router } from 'express';
import { body } from 'express-validator';

import authController from '../../controller/v1/auth.controller';

const router: Router = express.Router();

router.post(
  '/login',
  [body('email', 'Invalid email.!').notEmpty().isEmail()],
  authController.loginHandler,
);

export default router;
