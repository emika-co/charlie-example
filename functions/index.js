const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const express = require('express');
const cors = require('cors');
const app = express();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const validateFirebaseIdToken = async (req, res, next) => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
    return res.status(401).send({
      message: 'Unauthorized',
      payload: null
    });
  }

  let idToken;
  idToken = req.headers.authorization.split('Bearer ')[1];
  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);
    console.log('ID Token correctly decoded', decodedIdToken);
    req.uid = decodedIdToken;
    next();
    return;
  } catch (error) {
    console.error('Error while verifying Firebase ID token:', error);
    return res.status(401).send({
      message: 'Unauthorized',
      payload: null
    });
  }
};

const sellerRouter = require('./routes/sellers')

app.use(cors);
app.use(validateFirebaseIdToken);

app.use('/sellers', sellerRouter)

app.use('*', (_, res) => {
  res.status(404).send({
    message: 'Not Found',
    payload: null
  });
});

app.use((err, _, res) => {
  console.log(err)
  res.status(500).send({
    message: 'Internal Server Error',
    payload: null
  })
});

exports.app = functions.https.onRequest(app);
