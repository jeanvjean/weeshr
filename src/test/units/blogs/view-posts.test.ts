import 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'dotenv/config';
import Application from '../../../app';
const app = new Application().express;
chai.use(chaiHttp);
const {expect} = chai;

describe('Blog post', () =>{
    it('should return error when token is not provided', (done) => {
        chai.request(app)
        .get('/api/blog')
        .end((err, res) =>{
            expect(res.statusCode).to.eq(401);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal('please provide a token');
            done();
        })
    })
    it('should successfully fetch posts', (done) => {
        chai.request(app)
        .get('/api/blog')
        .set({'Authorization': process.env.ADMIN_LOGIN_TOKEN })
        .end((err, res) => {
            expect(res.statusCode).to.eq(200);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.eq('Blog list fetched successfully');
            expect(res.body).to.have.property('data');
            process.env.BLOG_ID = res.body.data.docs[0]._id;
            done();
        });
    })
});
