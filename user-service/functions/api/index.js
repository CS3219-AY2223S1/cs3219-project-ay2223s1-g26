const admin = require('firebase-admin')
const express = require('express')
const cors = require('cors')({ origin: true })
const bodyParser = require('body-parser')

if (!admin.apps.length) {
  admin.initializeApp()
}
const rawBodySaver = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8')
  }
}

/*
 * Parse application/x-www-form-urlencoded && application/json
 */
const app = express()
app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(cors)
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(bodyParser.json({ verify: rawBodySaver }))


app.post('/api/user/:route(*)', (req, res) => {
  require('./user/route').post(req, res, admin)
})
app.get('/api', (req, res) => {
  res.status(200).send('test')
})

app.get('*', require('./routes')._404Html)
app.post('*', require('./routes')._404)

module.exports = app