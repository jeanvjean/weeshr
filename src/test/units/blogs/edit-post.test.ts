import 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'dotenv/config';
import Application from '../../../app';
const app = new Application().express;
chai.use(chaiHttp);
const {expect} = chai;

describe('Blog update', () =>{
    it('should return error when token is not provided', (done) => {
        chai.request(app)
        .put(`/api/blog/${process.env.BLOG_ID}`)
        .send({
            content:'content creation is my thing, to do something special with it'
        })
        .end((err, res) =>{
            expect(res.statusCode).to.eq(401);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.equal('please provide a token');
            done();
        })
    })
    it('should return error if the user is not allowed to perform this action', (done) => {
        chai.request(app)
        .put(`/api/blog/${process.env.BLOG_ID}`)
        .set({'Authorization': process.env.USER_LOGIN_TOKEN })
        .send({
            title:"title 8",
            content:'content creation is my thing, to do something special with it'
        })
        .end((err, res) => {
            expect(res.statusCode).to.eq(403);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.eq('You cannot perform this action');
            done();
        })
    })
    it('should successfully update blog', (done) => {
        chai.request(app)
        .put(`/api/blog/${process.env.BLOG_ID}`)
        .set({'Authorization': process.env.ADMIN_LOGIN_TOKEN })
        .send({
            content:'content creation is my thing, to do something special with it updated'
        })
        .end((err, res) => {
            expect(res.statusCode).to.eq(200);
            expect(res.body).to.have.property('message');
            expect(res.body.message).to.eq('Blog updated successfully');
            expect(res.body).to.have.property('data');
            done();
        });
    })
});
