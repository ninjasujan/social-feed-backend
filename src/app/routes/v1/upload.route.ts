import express, { Router } from 'express';
import { body } from 'express-validator';

const router: Router = express.Router();

router.post('/upload-object', [
  body('fileName', 'Invalid file name.!').notEmpty().isString(),
]);

export default router;
