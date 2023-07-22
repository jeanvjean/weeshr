import {ValidationChain, validationResult, check} from 'express-validator';
import {RequestHandler, Request, Response, NextFunction} from 'express';
import Ctrl from '@controllers/ctrl';
import {BadInputFormatException} from '@exceptions/index';

export default class UserValidator extends Ctrl {
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

  static validateUserSchema(): ValidationChain[] {
    return [
      check('first_name')
        .exists()
        .withMessage('first_name is required')
        .isString()
        .withMessage('first_name must be a string'),
      check('last_name')
        .exists()
        .withMessage('last_name is required')
        .isString()
        .withMessage('last_name must be a string'),
      check('email')
        .exists()
        .withMessage('email is required')
        .isEmail()
        .withMessage('email must be a valid email address'),
      check('password')
        .exists()
        .withMessage('password is required')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
        .withMessage('Password must be at least six(8) character long and most contain at least 1 letter, 1 number and 1 special character')
    ];
  }

  static validateLoginSchema(): ValidationChain[] {
    return [
      check('email')
        .exists()
        .withMessage('email is required')
        .isEmail()
        .withMessage('Email must be a valid email address'),
      check('password')
        .exists()
        .withMessage('password is required')
    ];
  }
}
