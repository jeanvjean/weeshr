import Ctrl from '@src/controllers/ctrl';
import {Request, Response, NextFunction} from 'express';
import {RequestHandler} from 'express-serve-static-core';
import {DriverService} from '../services';
const serviceModule = new DriverService();


export default class DriverMiddleware extends Ctrl {
  private service: typeof serviceModule;
  constructor(props: typeof serviceModule) {
    super();
    this.service = props;
  }
  public getVehicle(type: string): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const driver = await serviceModule.createDriver(req.body);
        console.log({ driver });
        if (driver && type === 'create') {
          return this.errorResponse(req, res, 400, 'Driver already exists');
        }
        if (!driver && type === 'verify') {
          return this.errorResponse(req, res, 404, 'No driver with this details found');
        }
        if (!driver && type === 'create') {
          return next();
        }
        // @ts-ignore
        req.driver = driver;
        return next();
      } catch (error) {
        // @ts-ignore
        this.handleError(error, req, res);
      }
    };
  }

  public getDriver(): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) =>{
      try {
        const {params, query, body} = req;
        const payload = params.email || query.email || body.email;
        console.log({ payload });
        const driver = await serviceModule.getDriver({ email: payload });

        if (driver) {
          return this.errorResponse(req, res, 400, 'driver already exists');
        }
        // @ts-ignore
        req.driver = driver;
        return next();
      } catch (error) {
        // @ts-ignore
        this.handleError(error, req, res);
      }
    };
  }
}
