const functions = require('firebase-functions')
var auth = require('../auth')

async function getUser(res, admin, uid) {
  try {
    const userSnapshot = await admin.firestore().collection('users').doc(uid).get()
    const firestoreUser = Object.assign({
      id: userSnapshot.id
    }, userSnapshot.data())
    res.status(200).send(firestoreUser)
  } catch (e) {
    functions.logger.error(e)
    res.status(500).send(e)
  }
  return
}

module.exports = {
  _404(req, res) {
    res.status(404).send({
      status: 'not_found'
    })
  },
  async post(req, res, admin) {
    const uid = await auth.getUserUId(req, res)
    if (!uid) {
      return
    }
    if (req.params.route === 'getUser') {
      await getUser(res, admin, uid)
      return
    } else {
      res.status(404).send('Not found')
      return
    }
  }
}
