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
  middleware.getBlog('create'),
  controller.create()
);

router.get(
  '/',
  controller.fetchBlogs()
);

router.get(
  '/:id',
  middleware.getBlog('get'),
  controller.fetchOneBlog()
);

router.put(
  '/:id',
  middleware.getBlog('get'),
  controller.editPost()
);

router.delete(
  '/:id',
  middleware.getBlog('get'),
  controller.deletePost()
);

export default router;
