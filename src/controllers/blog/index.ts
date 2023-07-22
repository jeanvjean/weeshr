import { BlogInterface } from './../../models/blog';
import {Response, Request, RequestHandler} from 'express';
import Ctrl from '../ctrl';
import { blogModel } from '../../models';

type createPostType = {
  title: BlogInterface['title'];
  content: BlogInterface['content']
  author: BlogInterface['author']
}


export default class BlogController extends Ctrl {
  create(): RequestHandler {
    return async (req: Request, res: Response) =>{
      try {
        // @ts-ignore
        const { data: user } = req;
        const post: createPostType = { ...req.body, author: user._id };
        const data = await blogModel.create(post);
        this.ok(res, 'Blog created successfully', data);
      } catch (error) {
        // @ts-ignore
        this.handleError(error, req, res);
      }
    };
  }

  fetchBlogs(): RequestHandler {
    return async (req: Request, res: Response) => {
      try {
        const { query: { page, perPage, search } } = req;
        const options = {
          page: page || 1,
          limit: perPage || 10,
          populate: [{path: 'author', model: 'users', select: 
          { 'first_name': 1, 'last_name': 1, '_id': 1, 'role': 1 }}],
          sort: {createdAt: -1}
        };
        const q = {};
        const query = search ? { ...q, title: search } : q;
        // @ts-ignore
        const blogs = await blogModel.paginate(query, options);
        this.ok(res, 'Blog list fetched successfully', blogs);
      } catch (error) {
        // @ts-ignore
        this.handleError(error, req, res);
      }
    };
  }

  fetchOneBlog(): RequestHandler {
    return async (req: Request, res: Response) => {
      try {
        const { params: { id } } = req;
        const data = await blogModel.findById(id).populate([{path: 'author', model: 'users', select: 
        { 'first_name': 1, 'last_name': 1, '_id': 1, 'role': 1 }}]);
        // @ts-ignore
        this.ok(res, 'Blog fetched successfully', data);
      } catch (error) {
        // @ts-ignore
        this.handleError(error, req, res);
      }
    };
  }

  editPost(): RequestHandler {
    return async (req: Request, res: Response) => {
      try {
        const { body, params: { id } } = req;
        const updated = await blogModel.findByIdAndUpdate(id, { ...body }, { new: true });
        // @ts-ignore
        this.ok(res, 'Blog updated successfully', updated);
      } catch (error) {
        // @ts-ignore
        this.handleError(error, req, res);
      }
    };
  }

  deletePost(): RequestHandler {
    return async (req: Request, res: Response) => {
      try {
        // @ts-ignore
        const { blog } = req;
        await blog.delete();
        this.ok(res, 'Deleted successfully', {});
      } catch (error) {
        // @ts-ignore
        this.handleError(error, req, res);
      }
    };
  }
}
