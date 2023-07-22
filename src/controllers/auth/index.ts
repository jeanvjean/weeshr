import {Response, Request, RequestHandler} from 'express';
import Ctrl from '../ctrl';
import { UserInterface } from '../../models/users';
import { userModel } from '../../models';
import { hashData, compareData, signToken } from '../../utils/hash';

type createUserPayload = {
    first_name: UserInterface['first_name'];
    last_name: UserInterface['last_name'];
    email: UserInterface['email'];
    password: UserInterface['password'];
}


export default class UserController extends Ctrl {
  create(): RequestHandler {
    return async (req: Request, res: Response) => {
      try {
        const { body } = req;
        const data: createUserPayload = {...body, password: hashData(body.password)};
        const user = await userModel.create(data);
        this.ok(res, 'user created successfully', user);
      } catch (error) {
        // @ts-ignore
        this.handleError(error, req, res);
      }
    };
  }

  login(): RequestHandler {
    return async (req: Request, res: Response) => {
      try {
        const { user, body: { password } } = req;
        const isMatch = await compareData(password, user.password);
        if (!isMatch) {
          return this.errorResponse(req, res, 403, 'Email and Passwords do not match');
        }
        const token = await signToken({ id: user._id, email: user.email });
        this.ok(res, 'user Logged in successfully', { ...user._doc, password: null, token});
      } catch (error) {
        // @ts-ignore
        this.handleError(error, req, res);
      }
    };
  }
}
