import {Response, Request, RequestHandler} from 'express';
import Ctrl from '../ctrl';
import DriverModule from '@src/modules/drivers';


export default class DriverController extends Ctrl {
    private module: DriverModule;
    constructor(module: DriverModule) {
      super();
      this.module = module;
    }

    create(): RequestHandler {
      return async (req: Request, res: Response) =>{
        try {
          const data = await this.module.create({...req.body});
          this.ok(res, 'Driver saved successfully', data);
        } catch (error) {
          // @ts-ignore
          this.handleError(error, req, res);
        }
      };
    }
}
