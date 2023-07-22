import {Router as expressRouter} from 'express';
import Validator from '../controllers/blog/validator';
import BlogMiddleware from '@src/middlewares/middleware.blog';
import AuthMiddleware from '@src/middlewares/middleware.auth';
import BlogController from '@src/controllers/blog';
const val = new Validator();
const middleware = new BlogMiddleware();
const Authmiddleware = new AuthMiddleware();
const controller = new BlogController();

const router: expressRouter = expressRouter();

router.post(
  '/',
  Validator.validateBlogSchema(),
  val.validate(),
  Authmiddleware.getAuthorizationToken(),
  Authmiddleware.checkUserRole('create_post'),
  middleware.getBlog('create'),
  controller.create()
);

router.get(
  '/',
  Authmiddleware.getAuthorizationToken(),
  Authmiddleware.checkUserRole('read'),
  controller.fetchBlogs()
);

router.get(
  '/:id',
  Authmiddleware.getAuthorizationToken(),
  Authmiddleware.checkUserRole('read'),
  middleware.getBlog('get'),
  controller.fetchOneBlog()
);

router.put(
  '/:id',
  Authmiddleware.getAuthorizationToken(),
  Authmiddleware.checkUserRole('create_post'),
  middleware.getBlog('get'),
  controller.editPost()
);

router.delete(
  '/:id',
  Authmiddleware.getAuthorizationToken(),
  Authmiddleware.checkUserRole('create_post'),
  middleware.getBlog('get'),
  controller.deletePost()
);

export default router;
