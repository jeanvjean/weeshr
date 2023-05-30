import {Module} from '../module';
import {DriverService} from 'services/index';
import {DriverInterface} from '../../models/drivers';

export type DriverPropInterface = {
    driverService: DriverService;
}

type UserResponse = {
    data: DriverInterface;
    status: string;
}


export default class DriverModule extends Module {
    private service: DriverService;

    constructor(props: DriverPropInterface) {
      super();
      this.service = props.driverService;
    }

    public async create(data: DriverInterface): Promise<UserResponse> {
      try {
        const {name, email, phoneNumber, licenseNumber, carNumber} = data;
        const driver = {
          name,
          email,
          phoneNumber,
          carNumber,
          licenseNumber
        };
        const driverData = await this.service.createDriver(driver);
        console.log({driverData});
        return {
          data: driverData,
          status: 'success'
        };
      } catch (error) {
        throw new Error('an error occured');
      }
    }

  // public async fetchDriver(payload: checkCar): Promise<any> {
  //   try {
  //     const {email, car_number, license_number, phone_number} = payload;
  //     const query = {
  //       $or: [{email}, {carNumber: car_number}, {licenseNumber: license_number}, {phoneNumber: phone_number}]
  //     };
  //     const data = await this.driver.findOne(query);
  //     return data;
  //   } catch (error) {
  //     // @ts-ignore
  //     this.handleException(error);
  //   }
  // }

  // public async fetchSingleDriver(payload: string): Promise<any> {
  //   try {
  //     const query = {
  //       $or: [{email: payload}, {carNumber: payload}, {licenseNumber: payload}, {phoneNumber: payload}]
  //     };
  //     const data = await this.driver.findOne(query);
  //     return data;
  //   } catch (error) {
  //     // @ts-ignore
  //     this.handleException(error);
  //   }
  // }

  // public async verifyEmail(payload: VerifyMail): Promise<any> {
  //   try {
  //     const {email} = payload;
  //     const driver = await this.driver.findOneAndUpdate({email}, {isVerified: true, status: DriverStatus.ACTIVE}, {new: true});
  //     return {driver, status: 'success'};
  //   } catch (error) {
  //     // @ts-ignore
  //     this.handleException(error);
  //   }
  // }

  // public async shareLocation(payload: LocationInterface, id: string): Promise<any> {
  //   try {
  //     const driver = await this.driver.findByIdAndUpdate(id, {location: payload}, {new: true});
  //     return {driver, status: 'success'};
  //   } catch (error) {
  //     // @ts-ignore
  //     this.handleException(error);
  //   }
  // }

  // public async fetchNearbyDrivers(payload: SearchQuery): Promise<any> {
  //   try {
  //     // @ts-ignore
  //     const driver = await this.driver.aggregate([
  //       {
  //         $geoNear: {
  //           // @ts-ignore
  //           near: {type: 'Point', coordinates: [parseFloat(payload.latitude) || 0, parseFloat(payload.longitude) || 0]},
  //           maxDistance: 4*1000 || 0,
  //           spherical: true,
  //           distanceField: 'calcDistance'
  //         }
  //       },
  //       {
  //         $project: {
  //           name: 1,
  //           carNumber: 1,
  //           phoneNumber: 1
  //         }
  //       }
  //     ]);

  //     const message = driver.length > 0 ? 'Fetched all drivers within 4km of you' : 'No cabs available!';
  //     return {
  //       message,
  //       available_cabs: driver
  //     };
  //   } catch (error) {
  //     // @ts-ignore
  //     this.handleException(error);
  //   }
  // }
}
