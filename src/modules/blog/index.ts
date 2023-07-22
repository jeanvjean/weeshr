import { blogModel } from '../../models/index';
import {Module} from '../module';
import {BlogInterface} from '../../models/blog';

export type DriverPropInterface = {
    blog: typeof blogModel;
}

type BlogResponse = {
    data: BlogInterface;
    status: string;
}


export default class DriverModule extends Module {
    private blog: typeof blogModel;

    constructor(props: DriverPropInterface) {
      super();
      this.blog = props.blog;
    }

    public async create(data: BlogInterface): Promise<BlogResponse> {
      try {
        const { title, content } = data;
        const blogPost = {
          title,
          content,
          author: 'author_id',
        };
        // eslint-disable-next-line new-cap
        const blog = new this.blog(blogPost);
        await blog.save();
        return {
          data: blog,
          status: 'Blog created successfully'
        };
      } catch (error) {
        throw new Error('an error ocurred');
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
