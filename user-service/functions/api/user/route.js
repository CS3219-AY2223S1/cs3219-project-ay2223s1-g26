const functions = require('firebase-functions')
var auth = require('../auth')

async function getUser(res, admin, user) {
  const uid = user.uid
  functions.logger.log(user)
  try {
    const userSnapshot = await admin.firestore().collection('users').doc(uid).get()
    if (!userSnapshot.exists) { // New user
      await admin.firestore().collection('users').doc(uid).set({
        email: user.email,
        name: user.name
      })
      return
    }
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
    const user = await auth.getUser(req, res)
    if (!user || !user.uid) {
      return
    }
    if (req.params.route === 'getUser') {
      await getUser(res, admin, user)
      return
    } else {
      res.status(404).send('Not found')
      return
    }
  }
}
