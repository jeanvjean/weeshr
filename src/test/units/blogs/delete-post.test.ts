import 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'dotenv/config';
import Application from '../../../app';
const app = new Application().express;
chai.use(chaiHttp);
const {expect} = chai;

describe('Delete Blog post', () =>{
    it('should return error when token is not provided', (done) => {
        chai.request(app)
        .delete(`/api/blog/${process.env.BLOG_ID}`)
        .end((err, res) =>{
            expect(res.statusCode).to.eq(401);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal('please provide a token');
            done();
        })
    })
    it('should successfully delete post', (done) => {
        chai.request(app)
        .delete(`/api/blog/${process.env.BLOG_ID}`)
        .set({'Authorization': process.env.ADMIN_LOGIN_TOKEN })
        .end((err, res) => {
            expect(res.statusCode).to.eq(200);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.eq('Deleted successfully');
            done();
        });
    })
});
