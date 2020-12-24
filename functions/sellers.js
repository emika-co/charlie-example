const functions = require('firebase-functions');
const Seller = require('./models/seller');
const Item = require('./models/item');

exports.createSellers = functions.https.onCall(async (data, context) => {
  data.uid = context.auth.uid;
  const s = new Seller(data);
  // validate
  const invalid = await s.validate();
  if (invalid) {
    throw new functions.https.HttpsError('invalid-argument', invalid);
  }
  // create
  try {
    const docRef = await s.create();
    return {
      _id: docRef.id
    }
  } catch (error) {
    console.log(error);
    throw new functions.https.HttpsError('internal', 'Internal Server Error');
  }
});

exports.createItem = functions.https.onCall(async (data, context) => {
  data.uid = context.auth.uid;
  const i = new Item(data);
  // validate
  const invalid = await i.validate();
  if (invalid) {
    throw new functions.https.HttpsError('invalid-argument', invalid);
  }
  // create
  try {
    const docRef = await i.create();
    return {
      _id: docRef.id
    }
  } catch (error) {
    console.log(error);
    throw new functions.https.HttpsError('internal', 'Internal Server Error');
  }
});
