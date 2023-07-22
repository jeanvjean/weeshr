import { RequestHandler, NextFunction, Request, Response } from 'express';
import Ctrl from '@controllers/ctrl';
import { userModel } from '../models';
import { verifyToken } from '@src/utils/hash';

type tokenPayload = string;


export default class UserMiddleware extends Ctrl {
  getUser(type = ''): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        // @ts-ignore
        const { body: { email }, params: { id }, data } = req;
        const payload = type === 'create' || type === 'login' ? { email } : { _id: id || data.id };
        const user = await userModel.findOne(payload);
        if (!user && (type === 'get' || type === 'login')) {
          return this.errorResponse(req, res, 404, 'User not found');
        }
        if (user && type === 'create') {
          return this.errorResponse(req, res, 400, 'User account already exists');
        }
        // @ts-ignore
        req.user = user;
        return next();
      } catch (error) {
        // @ts-ignore
        this.handleError(error, req, res);
      }
    };
  }

  getAuthorizationToken(): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { headers } = req;
        // @ts-ignore
        const token: tokenPayload = headers.authorization?.split(' ')[0] === 'Bearer' ? headers.authorization?.split(' ')[1] : headers.authorization?.split(' ')[0];
        const decode = await verifyToken(token);
        // @ts-ignore
        const user = await userModel.findById(decode.id);
        // @ts-ignore
        req.data = user;
        return next();
      } catch (error) {
        // @ts-ignore
        this.handleError(error, req, res);
      }
    };
  }
}
