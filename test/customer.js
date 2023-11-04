const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const query = require('../db/customers');
const should = chai.should();
chai.use(chaiHttp);

const newCustomer = {
    firstname: 'zayd',
    lastname: 'khafif',
    email: 'zayd@khafif.com',
    phone: 12332
}
describe('POST customer', () => {
    beforeEach((done) => {
        query.deleteAllCustomers();
        done();
    })

    it('add a new customer', (done) => {
        chai.request(app)
            .post('/api/customers')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(newCustomer))
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('firstname');
                done();
            })
    })
})