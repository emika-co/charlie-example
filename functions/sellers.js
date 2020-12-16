const functions = require('firebase-functions');
const Seller = require('./models/seller');

exports.createSellers = functions.https.onCall(async (data, context) => {
  // const text = data.text;
  data.uid = context.auth.uid;
  const s = new Seller(data);
  const invalid = await s.validate();
  if (invalid) {
    throw new functions.https.HttpsError('already-exists', invalid)
  }
  try {
    const docRef = await s.create()
    return {
      storeId: docRef.storeId,
      sellerId: docRef.sellerId
    }
  } catch (error) {
    console.log(error)
    throw new functions.https.HttpsError('internal', 'Internal Server Error')
  }
});
