import {Request, Response, Router as expressRouter} from 'express';
import AppConfig from '@configs/app';
import blogRoutes from './route.blog';
import userRoutes from './router.auth';

const router: expressRouter = expressRouter();
router.get('/', (req: Request, res: Response): void => {
  res.send(`You've reached api routes of ${AppConfig.appName}`);
});

router.use('/blog', blogRoutes);
router.use('/users', userRoutes);

export default router;
