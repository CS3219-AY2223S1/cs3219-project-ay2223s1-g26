import functions from 'firebase-functions'
import serviceAccount from '../.env'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

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

app.post('/api/oauth/:route(*)', (req, res) => {
  require('./oauth/route').post(req, res, admin)
})
app.get('*', require('./routes')._404Html)
app.post('*', require('./routes')._404)

module.exports = app