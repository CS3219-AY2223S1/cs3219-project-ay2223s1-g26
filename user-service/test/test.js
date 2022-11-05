import chai from 'chai'
import {describe, it} from 'mocha'
import chaiHttp from 'chai-http'
import fs from 'fs'
// import app from '../functions/api/index.js'
const url = 'http://localhost:5001/peerprep-userser/us-central1/api'
import admin from "firebase-admin";
import { config } from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  config();
}

const rawData = fs.readFileSync('ServiceAccountKey.json')
const contents = JSON.parse(rawData)
// Create test user for firebase testing of authenticated routes
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
} catch (e) {
  console.log('Failed to create token for testing', e)
}

console.log('Token', token)

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
  describe('GET /addQuestionAttempt', () => {
    it('should return status 401', (done) => {
      chai.request(url)
        .get('/api/addQuestionAttempt')
        .end((err, res) => {
          assert.equal(res.status, 401)
          done()
        })
    });
  });
});

describe('Test authenticated route', () => {
  describe('GET /addQuestionAttempt', () => {
    it('should return status 401', (done) => {
      chai.request(url)
        .get('/api/addQuestionAttempt')
        .set({ "Authorization": `Bearer ${token}` })
        .end((err, res) => {
          console.log(res.status)
          assert.equal(res.status, 401)
          done()
        })
    });
  });
});
