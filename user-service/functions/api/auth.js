const admin = require('firebase-admin')
const functions = require('firebase-functions')

async function decode(authHeader) {
  if (authHeader) {
    const tokenId = authHeader.replace('Bearer ', '').trim()
    if (tokenId) {
      try {
        const decodedToken = await admin.auth().verifyIdToken(tokenId)
        return decodedToken
      } catch (err) {
        functions.logger.warn('Firebase: id token err: ', err)
      }
    }
  }
  return null
}

async function getUserUId(req, res) { //req do not seem to be taking in cur token thru webapp
  const authHeader = req.get('Authorization')
  const decodedToken = await decode(authHeader)
  if (!decodedToken || !decodedToken.uid) {
    res.sendStatus(403)
    return false
  }
  return decodedToken.uid
}

module.exports = { decode, getUserUId }