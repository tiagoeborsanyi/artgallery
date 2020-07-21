const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const admin = require('firebase-admin')

const photosRoutes = require('./routes/photos-routes')
const usersRoutes = require('./routes/users-routes')
const HttpError = require('./models/http-error')
const keys = require('./config/keys')

const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
  next()
})

admin.initializeApp({
  credential: admin.credential.cert(keys.firebase),
  databaseURL: "https://drawdry-3f5b8.firebaseio.com"
})

app.use('/api/photos', photosRoutes)
app.use('/api/users', usersRoutes)

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  next(error)
})

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error)
  }
  res.status(error.code || 500)
  res.json({ message: error.message || 'An unknown error ocurred.' })
})

mongoose
  .connect(keys.mongoURI)
  .then(() => console.log('mongo conected.'))
  .catch(err => console.log(err));

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('connect on port 5000'))
