import 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'dotenv/config';
import Application from '../../../app';
const app = new Application().express;
chai.use(chaiHttp);
const {expect} = chai;

describe('Sign In', () =>{
    it('should return error when required fields are not provided', (done) => {
        chai.request(app)
        .post('/api/users/login')
        .send({
            email:'freddy02@mailinator.com',
        })
        .end((err, res) =>{
            expect(res.statusCode).to.eq(400);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal('password is required');
            done();
        })
    })
    it('should successfully log in user account', (done) => {
        chai.request(app)
        .post('/api/users/login')
        .send({
            email:'freddy@mailinator.com',
            password:'Password@1',
        })
        .end((err, res) => {
            expect(res.statusCode).to.eq(200);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.eq('user Logged in successfully');
            expect(res.body).to.have.property('data');
            process.env.USER_LOGIN_TOKEN = res.body.data.token;
            done();
        })
    })
    it('should successfully log in admin account', (done) => {
        chai.request(app)
        .post('/api/users/login')
        .send({
            email:'admin@mailinator.com',
            password:'Password@1',
        })
        .end((err, res) => {
            expect(res.statusCode).to.eq(200);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.eq('user Logged in successfully');
            expect(res.body).to.have.property('data');
            process.env.ADMIN_LOGIN_TOKEN = res.body.data.token;
            done();
        });
    })
})