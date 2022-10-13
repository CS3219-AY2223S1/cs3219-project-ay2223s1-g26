const functions = require('firebase-functions')
const { ResultStorage } = require('firebase-functions/v1/testLab')
var auth = require('../auth')

async function getUser(res, admin, user) {
  functions.logger.log('start of getUser')
  const uid = user.uid
  try {
    const userSnapshot = await admin.firestore().collection('users').doc(uid).get()
    if (!userSnapshot.exists) { // New user
      functions.logger.log('creating new user')
      const userObj = {
        email: user.email,
        name: user.name,
        questionsAttempted: {},
        questionDifficulty: {'Easy': 0, 'Medium': 0, 'Hard': 0},
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      }
      await admin.firestore().collection('users').doc(uid).set(userObj, { merge: true })
      functions.logger.log('finished creating new user')
      res.status(200).send(userObj)
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
}

async function addQuestionAttempt(res, admin, uid, questionId, questionDifficulty, questionTitle) {
  try {
    const userRef = admin.firestore().collection('users').doc(uid)
    const userDoc = await userRef.get()
    const existingData = userDoc.data()
    const questionObj = {
      [questionId] : {
        questionTitle,
        questionDifficulty,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      }
    }
    const difficulties = ['Easy', 'Medium', 'Hard']
    const oldDifficultyMap = existingData.questionDifficulty
    const newDifficultyMap = {}
    for (const diff of difficulties) {
      if (diff.toLowerCase() === questionDifficulty.toLowerCase()) { //To increment
        Object.assign(newDifficultyMap, {[diff]: oldDifficultyMap[diff] + 1})
      } else {
        Object.assign(newDifficultyMap, {[diff]: oldDifficultyMap[diff]})
      }
    }
    await userRef.set({
      questionsAttempted: questionObj,
      questionDifficulty: newDifficultyMap,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, {merge: true})
    res.sendStatus(200)
  } catch (e) {
    functions.logger.error(e)
    res.status(500).send(e)
  }
}

async function saveCode(res, admin, uid, questionId, questionDifficulty, questionTitle, code) {
  try {
    const userRef = admin.firestore().collection('users').doc(uid)
    const questionObj = {
      [questionId] : {
        questionTitle,
        questionDifficulty,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
      }
    }
    const promises = []
    promises.push(userRef.collection('savedCode').doc(questionId).set({
      questionDifficulty,
      questionTitle,
      code,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true }))
    promises.push(userRef.set({
      questionsSaved: questionObj,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    }, { merge: true }))
    await Promise.all(promises)
    res.sendStatus(200)
  } catch (e) {
    functions.logger.error(e)
    res.status(500).send(e)
  }
}

async function getSavedCode(res, admin, uid, questionId) {
  try {
    const userRef = admin.firestore().collection('users').doc(uid)
    const codeDoc = await userRef.collection('savedCode').doc(questionId).get()
    if (!codeDoc.exists) {
      functions.logger.error('getSavedCode: invalid questionId')
      res.sendStatus(500)
      return
    }
    const code = codeDoc.data().code
    res.status(200).send(code)
  } catch (e) {
    functions.logger.error(e)
    res.status(500).send(e)
  }
}

module.exports = {
  _404(req, res) {
    res.sendStatus(404)
  },
  async post(req, res, admin) {
    console.log(req.params.route)
    const user = await auth.getUser(req, res)
    const uid = user.uid
    if (!uid) {
      return
    }
    if (req.params.route === 'getUser') {
      await getUser(res, admin, user)
      return
    } else if (req.params.route === 'addQuestionAttempt') {
      if (req.body.questionId, req.body.questionDifficulty, req.body.questionTitle) {
        await addQuestionAttempt(res, admin, uid, req.body.questionId, req.body.questionDifficulty, req.body.questionTitle)
        return
      } else {
        res.sendStatus(400)
        return
      }
    } else if (req.params.route === 'addQuestionAttempt') {
      if (req.body.questionId, req.body.questionDifficulty, req.body.questionTitle) {
        await addQuestionAttempt(res, admin, uid, req.body.questionId, req.body.questionDifficulty, req.body.questionTitle)
        return
      } else {
        res.sendStatus(400)
        return
      }
    } else if (req.params.route === 'saveCode') {
      if (req.body.questionId, req.body.code) {
        await saveCode(res, admin, uid, req.body.questionId, req.body.questionDifficulty, req.body.questionTitle, req.body.code)
        return
      } else {
        res.sendStatus(400)
        return
      }
    } else if (req.params.route === 'getSavedCode') {
      if (req.body.questionId) {
        await getSavedCode(res, admin, uid, req.body.questionId)
        return
      } else {
        res.sendStatus(400)
        return
      }
    } else {
      res.sendStatus(404)
      return
    }
  }
}
