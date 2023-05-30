/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-ignore
import 'mocha';
import * as mongoose from 'mongoose';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'dotenv/config';
import Application from '../../app';
import {user1, user2} from '../payload';
const app = new Application().express;
chai.use(chaiHttp);
const {expect} = chai;

describe('Database', ()=>{
  before(function(done) {
    mongoose.connect(`${process.env.TEST_DATABASE_URL}`, () => {
      mongoose.connection.db.dropDatabase(function() {
        done();
      });
    });
  });
});

describe('Cab app Tests', ()=>{
  describe('register cab', ()=>{
    it('should fail if required fields are not passed', (done)=>{
      chai.request(app)
        .post('/api/driver/add-driver')
        .send(user2)
        .end((err: any, res: any)=>{
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('car_number is required');
          expect(res.statusCode).to.equal(400);
          done();
        });
    });
    it('should register user successfully', (done)=>{
      chai.request(app)
        .post('/api/driver/add-driver')
        .send(user1)
        .end((err: any, res: any)=>{
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Driver saved successfully');
          expect(res.statusCode).to.equal(200);
          process.env.USER1_EMAIL = res.body.data.driver.email;
          done();
        });
    });
    it('should fail if user already exist', (done)=>{
      chai.request(app)
        .post('/api/driver/add-driver')
        .send(user1)
        .end((err: any, res: any)=>{
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Driver already exists');
          expect(res.statusCode).to.equal(400);
          done();
        });
    });
  });
  describe('Verify email', ()=>{
    it('should verify registered email', (done)=> {
      chai.request(app)
        .get(`/api/driver/verify?email=${process.env.USER1_EMAIL}`)
        .end((err: any, res: any)=>{
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('account verified');
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('should fail to verify unregistered email', (done)=> {
      chai.request(app)
        .get(`/api/driver/verify?email=notregistered@mailinator.com`)
        .end((err: any, res: any)=>{
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('No driver with this details found');
          expect(res.statusCode).to.equal(404);
          done();
        });
    });
  });
  describe('Share location', ()=>{
    it('should share location successfully', (done)=> {
      chai.request(app)
        .patch(`/api/driver/share-location/${process.env.USER1_EMAIL}`)
        .send({
          type: 'Point',
          coordinates: [
            12.972461,
            77.580660
          ]
        })
        .end((err: any, res: any)=>{
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('location updated successfully');
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('should fail to share location for unregistered user', (done)=> {
      chai.request(app)
        .patch(`/api/driver/share-location/notregistered@mailinator.com`)
        .send({
          type: 'Point',
          coordinates: [
            12.972461,
            77.580660
          ]
        })
        .end((err: any, res: any)=>{
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('No driver with this details found');
          expect(res.statusCode).to.equal(404);
          done();
        });
    });
  });
  describe('Get nearby cabs', ()=>{
    it('should fetch nearby cabs successfully', (done)=> {
      chai.request(app)
        .get(`/api/driver/nearby-drivers?latitude=12.972442&longitude=77.580643`)
        .end((err: any, res: any)=>{
          expect(res.body).to.have.property('message');
          expect(res.body.data.message).to.equal('Fetched all drivers within 4km of you');
          expect(res.body.message).to.equal('success');
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
    it('should return no records', (done)=> {
      chai.request(app)
        .get(`/api/driver/nearby-drivers`)
        .end((err: any, res: any)=>{
          expect(res.body).to.have.property('message');
          expect(res.body.data.message).to.equal('No cabs available!');
          expect(res.body.message).to.equal('success');
          expect(res.statusCode).to.equal(200);
          done();
        });
    });
  });
});
