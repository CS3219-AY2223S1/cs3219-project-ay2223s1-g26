import chai from 'chai'
import {describe, it} from 'mocha'
import chaiHttp from 'chai-http'
import fs from 'fs'
import axios from 'axios'
const url = 'http://localhost:5001/peerprep-userser/us-central1/api'
import admin from "firebase-admin";
import { config } from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  config();
}

try {
  const rawData = fs.readFileSync('ServiceAccountKey.json')
  const contents = JSON.parse(rawData)
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    credential: admin.credential.cert(contents),
    authDomain: "peerprep-userser.firebaseapp.com",
    projectId: "peerprep-userser",
    storageBucket: "peerprep-userser.appspot.com",
    messagingSenderId: "1017360607564",
    appId: "1:1017360607564:web:8c39c6b7831774746a87e9",
    measurementId: "G-PHPR5YLWSH",
  };
  admin.initializeApp(firebaseConfig)
} catch (e) {
  console.log(e)
}
// Create test user for firebase testing of authenticated routes


const uid = 'test-uid';
const developerClaims = {
  email:'test-email@email.com',
  name: 'test-name'
}

let token
try {
  await admin.auth().createCustomToken(uid, developerClaims)
    .then((customToken) => {
      token = customToken
    })
    .catch((error) => {
      console.log('Error creating custom token:', error);
    });
    const res = await axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${process.env.FIREBASE_API_KEY}`, {
      token,
      returnSecureToken: true
    })
    // console.log(res)
    token = res.data.idToken;
} catch (e) {
  console.log('Failed to create token for testing', e)
}

// console.log('Token', token)

chai.use(chaiHttp)
var assert = chai.assert

describe('Test if server is running', () => {
  describe('GET /api', () => {
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

describe('Test authenticated route', () => {
  describe('GET api/getUser', () => {
    it('should return status 401', (done) => {
      chai.request(url)
        .get('/api/getUser')
        .end((err, res) => {
          assert.equal(res.status, 401)
          done()
        })
    });
  });
});

describe('Create user', () => {
  describe('GET api/getUser', () => {
    it('should return status 200', (done) => {
      chai.request(url)
        .get('/api/getUser')
        .set({ "Authorization": `Bearer ${token}` })
        .end((err, res) => {
          assert.equal(res.status, 200)
          done()
        })
    });
  });
});

describe('Get user information', () => {
  describe('GET api/getUser', () => {
    it('should return status 200', (done) => {
      chai.request(url)
        .get('/api/getUser')
        .set({ "Authorization": `Bearer ${token}` })
        .end((err, res) => {
          assert.equal(res.body.id, uid)
          assert.equal(res.body.name, developerClaims.name)
          assert.equal(res.body.email, developerClaims.email)
          assert.deepEqual(res.body.questionsAttempted, {})
          assert.deepEqual(res.body.questionDifficulty, {
            "Easy": 0,
            "Hard": 0,
            "Medium": 0})
          assert.equal(res.status, 200)
          done()
        })
    });
  });
});

describe('Post easy question attempt', () => {
  describe('POST api/addQuestionAttempt', () => {
    it('should return status 200', (done) => {
      chai.request(url)
      .post('/api/addQuestionAttempt')
      .set({ "Authorization": `Bearer ${token}` })
      .send({
        "questionId": "1",
        "questionDifficulty": "Easy",
        "questionTitle": "Linked list"
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
    });
  });
});

describe('Post medium question attempt', () => {
  describe('POST api/addQuestionAttempt', () => {
    it('should return status 200', (done) => {
      chai.request(url)
      .post('/api/addQuestionAttempt')
      .set({ "Authorization": `Bearer ${token}` })
      .send({
        "questionId": "2",
        "questionDifficulty": "Medium",
        "questionTitle": "Bubble Sort"
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
    });
  });
});

describe('Post hard question attempt', () => {
  describe('POST api/addQuestionAttempt', () => {
    it('should return status 200', (done) => {
      chai.request(url)
      .post('/api/addQuestionAttempt')
      .set({ "Authorization": `Bearer ${token}` })
      .send({
        "questionId": "3",
        "questionDifficulty": "Hard",
        "questionTitle": "Reverse Merge Sort"
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
    });
  });
});

describe('Save easy question attempt', () => {
  describe('POST api/saveCode', () => {
    it('should return status 200', (done) => {
      chai.request(url)
      .post('/api/saveCode')
      .set({ "Authorization": `Bearer ${token}` })
      .send({
        "questionId": "4",
        "questionDifficulty": "Easy",
        "questionTitle": "Binary search",
        "code": "E = mc^2"
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
    });
  });
});

describe('Save medium question attempt', () => {
  describe('POST api/saveCode', () => {
    it('should return status 200', (done) => {
      chai.request(url)
      .post('/api/saveCode')
      .set({ "Authorization": `Bearer ${token}` })
      .send({
        "questionId": "5",
        "questionDifficulty": "Medium",
        "questionTitle": "Quick sort",
        "code": "E = mc^2"
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
    });
  });
});

describe('Save hard question attempt', () => {
  describe('POST api/saveCode', () => {
    it('should return status 200', (done) => {
      chai.request(url)
      .post('/api/saveCode')
      .set({ "Authorization": `Bearer ${token}` })
      .send({
        "questionId": "6",
        "questionDifficulty": "Hard",
        "questionTitle": "Reverse quick sort",
        "code": "E = mc^2"
      })
      .end((err, res) => {
        assert.equal(res.status, 200)
        done()
      })
    });
  });
});

describe('Get saved code', () => {
  describe('GET api/getSavedCode?questionId=4', () => {
    it('should return status 200', (done) => {
      chai.request(url)
        .get('/api/getSavedCode?questionId=4')
        .set({ "Authorization": `Bearer ${token}` })
        .end((err, res) => {
          assert.equal(res.text, 'E = mc^2')
          assert.equal(res.status, 200)
          done()
        })
    });
  });
});
