import DriverQueries from '../queries/drivers';
import DatabaseQueryRunner from '../configs/database';
import {DriverInterface} from '../models/drivers';

type CreateDriver = DriverInterface;

class DriverService {
  public async createDriver(dataQuery: object) {
    const [ data ] = await DatabaseQueryRunner.transaction(DriverQueries.createDriver, dataQuery);
    return data;
  }

  public async getDriver(data: object) {
    return await DatabaseQueryRunner.singleTransaction(DriverQueries.getDriver, data);
  }
}

export default DriverService;
