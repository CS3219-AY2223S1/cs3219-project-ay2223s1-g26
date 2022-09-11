const functions = require('firebase-functions')
var auth = require('../../helper/auth')

async function onboard(admin, res, uid, name, email) {
  const userAccount = {
    name,
    email,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  }
  try {
    const response = await admin.firestore().collection('users').doc(uid)
      .set(userAccount, { merge: true })
    if (response) {
      functions.logger.log('onboard success', uid)  
    }
  } catch (e) {
    functions.logger.error(e)
    res.status(500).send(false)
    return
  }
  res.status(200).send(userAccount)
  return userAccount
}

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
    if (req.params.route === 'test') {
      res.sendStatus(200)
      return
    }
    const uid = await auth.getUserUId(req, res)
    if (!uid) {
      return
      // change to set (can change a few not all values -- expandable)
    } else if (req.params.route === 'onboard') {
      if ((req.body.name, req.body.email)) {
        await onboard(admin, res, uid, req.body.name, req.body.email)
        return
      } else {
        res.status(400).send({
          status: 'invalid_body'
        })
        return
      }
    } else if (req.params.route === 'getUser') {
      await getUser(res, admin, uid)
      return
    } else {
      res.status(404).send('Not found')
      return
    }
  }
}
