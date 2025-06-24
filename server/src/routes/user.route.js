import express from 'express';
import { loginController, profile, signupController } from '../controllers/user.controller.js';
import { authorized } from '../middlewares/auth.middleware.js';
import { loginSchema, signupSchema } from '../middlewares/user.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

const userRouter = express.Router();

userRouter.post('/signup', validate(signupSchema), signupController );
userRouter.post('/login', validate(loginSchema), loginController );
userRouter.get('/profile', authorized, profile );

export default userRouter;