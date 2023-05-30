/* eslint-disable @typescript-eslint/ban-ts-ignore */
/* eslint-disable require-jsdoc */
import {RequestHandler, Request, Response, NextFunction} from 'express';
import Ctrl from '@controllers/ctrl';
import {mkdirSync, existsSync, unlinkSync} from 'fs-extra';
import {
  BadInputFormatException,
} from '@exceptions/index';
import Uploader from '../utils/uploader';

/**
 * Middleware to handles token authentication
 * @category Controllers
 */
class UploadMiddleware extends Ctrl {
  avatarUpload(): RequestHandler {
    return async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      try {
        // @ts-ignore
        const files = req.files;
        if (!files) {
          throw new BadInputFormatException(
            'Add a file to update profile photo'
          );
        }
        const file = files.avatar;
        if (!file) {
          throw new BadInputFormatException(
            'The image must be provided with the key: `avatar`'
          );
        }
        const path = './temp';
        if (!existsSync(path)) {
          mkdirSync(path);
        }
        await file.mv(path + '/' + file.name);
        const uploader = new Uploader();
        let url = await uploader.upload(path + '/' + file.name, `profile/`, {
          width: 200,
          height: 200
        });
        const str = url;
        url = [str.slice(0, 46), '/w_200,h_200,c_scale', str.slice(46)].join('');
        req.body = {
          update: {
            avatar: url
          }
        };
        unlinkSync(path + '/' + file.name);
        next();
      } catch (error) {
        // @ts-ignore
        this.handleError(error, req, res);
      }
    };
  }
}

export default UploadMiddleware;
