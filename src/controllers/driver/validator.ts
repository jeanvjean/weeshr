import {ValidationChain, validationResult, check} from 'express-validator';
import {RequestHandler, Request, Response, NextFunction} from 'express';
import Ctrl from '@controllers/ctrl';
import {BadInputFormatException} from '@exceptions/index';


export default class DriverValidator extends Ctrl {
  /**
       * @return {ValidationChain[]}
       */
  validate(): RequestHandler {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      const result = validationResult(req);
      const hasErrors = !result.isEmpty();
      const errors = result.array();
      if (hasErrors) {
        const error = new BadInputFormatException(
          errors.map((i) => i.msg).join(','),
          errors.map((e) => e.msg)
        );
        return this.handleError(error, req, res);
      }
      return next();
    };
  }

  static validateDriverSchema(): ValidationChain[] {
    return [
      check('name')
        .isString()
        .withMessage('Name must be a string'),
      check('email')
        .exists()
        .withMessage('email is required'),
      check('phone_number')
        .exists()
        .withMessage('phone number is required')
        .matches(/^(\+\d{2,3})(?:\d\s?){9,10}$/)
        .withMessage('Phone number must contain international code as well as 9 or 10 digits!'),
      check('license_number')
        .exists()
        .withMessage('license number is required'),
      check('car_number')
        .exists()
        .withMessage('car_number is required')
    ];
  }
}
