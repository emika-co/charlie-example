const functions = require('firebase-functions');
const Seller = require('./models/seller');

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
    throw new functions.https.HttpsError('internal', 'Internal Server Error');
  }
});
