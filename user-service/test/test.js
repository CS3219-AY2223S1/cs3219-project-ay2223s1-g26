import {describe, it} from 'mocha'
import chaiHttp from 'chai-http'
import chai from 'chai'

const api = "https://us-central1-peerprep-userser.cloudfunctions.net/api";
chai.use(chaiHttp)
var assert = chai.asset

// Get tests
describe('Invalid body', () => {
  describe('#test()', () => {
    it('should return status 200', async () => {
      chai.request(api)
        .post('/fdsafad')
        .end((err, res) => {
          assert.equal(res.status, 200)
          console.log(res.body)
          done()
        })
    });
  });
});