import 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'dotenv/config';
import Application from '../../../app';
const app = new Application().express;
chai.use(chaiHttp);
const {expect} = chai;

describe('Sign Up', () =>{
    it('should return error when required fields are not provided', (done) => {
        chai.request(app)
        .post('/api/users')
        .send({
            first_name:'fred',
            last_name:'Jay',
            email:'freddy02@mailinator.com',
            password:'Password@1',
        })
        .end((err, res) =>{
            expect(res.statusCode).to.eq(400);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal('role is required');
            done();
        })
    })
    it('should successfully signup user account', (done) => {
        chai.request(app)
        .post('/api/users')
        .send({
            first_name:'freddy',
            last_name:'Jay',
            email:'freddy@mailinator.com',
            password:'Password@1',
            role: 'user'
        })
        .end((err, res) => {
            expect(res.statusCode).to.eq(200);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.eq('user created successfully')
            done();
        })
    })
    it('should return error when the user already exists', (done) => {
        chai.request(app)
        .post('/api/users')
        .send({
            first_name:'freddy',
            last_name:'Jay',
            email:'freddy@mailinator.com',
            password:'Password@1',
            role: 'admin'
        })
        .end((err, res) => {
            expect(res.statusCode).to.eq(400);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.eq('User account already exists')
            done();
        })
    })
    it('should successfully signup user account', (done) => {
        chai.request(app)
        .post('/api/users')
        .send({
            first_name:'Admin',
            last_name:'Jay',
            email:'admin@mailinator.com',
            password:'Password@1',
            role: 'admin'
        })
        .end((err, res) => {
            expect(res.statusCode).to.eq(200);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.eq('user created successfully')
            done();
        });
    })
})