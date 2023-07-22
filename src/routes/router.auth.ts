import {Router as expressRouter} from 'express';
import UserController from '../controllers/auth';
import UserMiddleware from '@src/middlewares/middleware.auth';
import Validator from '../controllers/auth/validator';
const validator = new Validator();

const controller = new UserController();
const middleware = new UserMiddleware();

const router: expressRouter = expressRouter();

router.post(
  '/',
  Validator.validateUserSchema(),
  validator.validate(),
  middleware.getUser('create'),
  controller.create()
);

router.post(
  '/login',
  Validator.validateLoginSchema(),
  validator.validate(),
  middleware.getUser('login'),
  controller.login()
);

export default router;
