const { should } = require('chai')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../server')
chai.should()
chai.use(chaiHttp)

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
})

module.exports = app
