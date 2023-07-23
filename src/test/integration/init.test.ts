// @ts-ignore
import 'mocha';
import * as mongoose from 'mongoose';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'dotenv/config';

chai.use(chaiHttp);
const {expect} = chai;

describe('Database', ()=>{
  before(function(done) {
    // @ts-ignore
    mongoose.connect(`${process.env.TEST_DATABASE_CONNECTION_STRING}`, (err, conn) => {
      conn.connection.db.dropDatabase();
    });
    done();
  });
});
