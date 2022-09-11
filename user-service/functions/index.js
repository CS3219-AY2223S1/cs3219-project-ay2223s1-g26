const admin = require('firebase-admin')
const functions = require('firebase-functions')

if (!admin.apps.length) {
  admin.initializeApp()
}

exports.api = functions.https.onRequest(require('./api/index'))