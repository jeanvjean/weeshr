import {ConnectionOptions} from 'mongoose';
import pgPromise = require('pg-promise');

const pg = pgPromise({promiseLib: global, noWarnings: true});
class DbConnection {
	static NODE_ENV = `${process.env.NODE_ENV}`;

	static databaseString = () => {
	  switch (DbConnection.NODE_ENV) {
	  case 'development': return process.env.DEV_DATABASE_CONNECTION_STRING;
	  case 'test': return process.env.TEST_DATABASE_CONNECTION_STRING;
	  case 'production': return process.env.PROD_DATABASE_CONNECTION_STRING;
	  case 'staging': return process.env.STAGING_DATABASE_CONNECTION_STRING;
	  default: return 'development';
	  }
	}

	static options: ConnectionOptions = {
	  socketTimeoutMS: 0,
	  keepAlive: true,
	  poolSize: `${DbConnection.NODE_ENV}` !== 'development' ? 5 : 1,
	  useNewUrlParser: true,
	  useCreateIndex: true,
	  useUnifiedTopology: true
	}

	static postgresDb = pg(`${DbConnection.databaseString()}`);
}

export default DbConnection;
