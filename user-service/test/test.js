import chai from 'chai'
import {describe, it} from 'mocha'
import chaiHttp from 'chai-http'
// import app from '../functions/api/index.js'
const url = 'http://localhost:5001/peerprep-userser/us-central1/api'

chai.use(chaiHttp)
var assert = chai.assert

describe('Test if server is running', () => {
  describe('GET /api()', () => {
    it('should return status 200', (done) => {
      chai.request(url)
        .get('/api')
        .end((err, res) => {
          assert.equal(res.status, 200)
          done()
        })
    });
  });
});
