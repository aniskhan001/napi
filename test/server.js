// TODO: fix test cases
import {use} from 'chai';
import chaiHttp from 'chai-http';
import {app} from '../server.js'

const chai = use(chaiHttp);

describe('HEALTH check!', () => {
  it('should return 200 on index', (done) => {
    chai.request(app).get('/').end((err, res) => {
      should.not.exist(err)
      res.should.have.status(200)
      done()
    })
  })

  it('should return 404 on bad endpoints', (done) => {
    chai.request(app).get('/dang').end((err, res) => {
      should.not.exist(err)
      res.should.have.status(404)
      done()
    })
  })

  it('should not get anything since nothing is created', (done) => {
    chai.request(app).get('/:id').end((err, res) => {
      should.not.exist(err)
      res.should.have.status(404)
      done()
    })
  })
})
