import Ctrl from '@src/controllers/ctrl';
import {Request, Response, NextFunction} from 'express';
import {RequestHandler} from 'express-serve-static-core';
import { blogModel } from '../models/index';

export default class BlogMiddleware extends Ctrl {
  private blog: typeof blogModel;
  constructor() {
    super();
    this.blog = blogModel;
  }

  public getBlog(type = ''): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) =>{
      try {
        const {body: { title }, params: { id }} = req;
        const payload = title;
        const query = type === 'get' ? { _id: id } : { title: payload };
        const blog = await this.blog.findOne(query);
        if (blog && type === 'create') {
          return this.errorResponse(req, res, 400, 'blog title already exists');
        }
        if (!blog && type === 'get') {
          return this.errorResponse(req, res, 400, 'Sorry!! This blog post id does not exist');
        }
        // @ts-ignore
        req.blog = blog;
        return next();
      } catch (error) {
        // @ts-ignore
        this.handleError(error, req, res);
      }
    };
  }
}
