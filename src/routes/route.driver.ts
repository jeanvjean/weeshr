import {Router as expressRouter, Router} from 'express';
import Validator from '../controllers/driver/validator';
import DriverMiddleware from '@src/middlewares/middleware.driver';
import DriverController from '@src/controllers/driver';
const val = new Validator();
// @ts-ignore
const driver = new DriverMiddleware();
// @ts-ignore
const controller = new DriverController();

const router: expressRouter = expressRouter();

router.post(
  '/add-driver',
  Validator.validateDriverSchema(),
  val.validate(),
  driver.getDriver(),
  controller.create()
);

// router.get(
//   '/verify',
//   driver.getDriver(),
//   driverCtrl.verify()
// );

// router.patch(
//   '/share-location/:email',
//   driver.getDriver(),
//   driverCtrl.updateLocation()
// );

// router.get(
//   '/nearby-drivers',
//   driverCtrl.fetchNearbyDrivers()
// );

export default router;
