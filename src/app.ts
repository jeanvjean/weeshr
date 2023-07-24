import {join} from 'path';
import {json, urlencoded} from 'body-parser';
import * as express from 'express';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as compression from 'compression';
import { connect } from 'mongoose';
import connectionOptions from './configs/databaseConnection';

import AppConfig from './configs/app';
import {ctrl} from './controllers';
import router from './routes';

class Application {
	public express: express.Application

	constructor() {
	  this.express = express();
	  this.configure();
	  this.handleExceptions();
	  if(process.env.NODE_ENV !== 'test'){
		this.express.listen(AppConfig.port, () => {
			console.log(`${AppConfig.appName} is listening at port ${AppConfig.port}`);
		});
	}
	// @ts-ignore
	connect(`${connectionOptions.databaseString()}`, connectionOptions.options, (err, conn) =>{
		if(err) { console.log(err) };
		console.log('Connected to MongoDb');
	})
	}

	private configure(): void {
	  this.express.use(morgan('dev'));
	  this.express.use(json({limit: AppConfig.clientBodyLimit}));
	  this.express.use(urlencoded({extended: true}));
	  this.express.use(express.static(join(__dirname, '../', 'public')));
	  this.express.use(compression());
	  this.express.use('*', cors());
	  this.express.options('*', cors());
	  this.express.use(helmet());
	  this.express.use('/api/', router);
	}

	private handleExceptions(): void {
	  this.express.use(ctrl.handleNotFound);
	  this.express.use(ctrl.handleError);
	}
}

export default Application;
