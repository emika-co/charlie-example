const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const express = require('express');
const appSeller = express();
const cors = require('cors');
const Seller = require('./models/seller');

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
    req.uid = decodedIdToken;
    return next();
  } catch (error) {
    console.error('Error while verifying Firebase ID token:', error);
    return res.status(401).send({
      message: 'Unauthorized',
      payload: null
    });
  }
};

appSeller.use(cors());
appSeller.use(validateFirebaseIdToken);

appSeller.get('/', (_, res) => {
  res.send('test');
});

appSeller.post('/', async (req, res) => {
  try {
    console.log('Starting...')
    const s = new Seller(req.body);
    await s.validate();
    const doc = await s.create()
    res.status(200).send({
      message: '',
      payload: {
        _id: doc.id
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      res.status(500).send({
        message: 'Internal Server Error',
        payload: null
      });
    } else {
      res.status(422).send({
        message: 'Invalid infomation',
        payload: { err }
      })
    }
  }
});

exports.sellers = functions.https.onRequest(appSeller);
