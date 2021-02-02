const functions = require('firebase-functions').region('asia-southeast2');
const { https } = require('firebase-functions');
const Seller = require('./models/seller');

exports.createSellers = functions.runWith({
  vpcConnector: 'cloud-functions-vpc',
  vpcConnectorEgressSettings: 'PRIVATE_RANGES_ONLY'
}).https.onCall(async (data, context) => {
  data.uid = context.auth.uid;
  const s = new Seller(data);
  // validate
  const invalid = await s.validate();
  if (invalid) {
    throw new https.HttpsError('invalid-argument', invalid);
  }
  // create
  try {
    const docRef = await s.create();
    return {
      _id: docRef.id
    }
  } catch (error) {
    throw new https.HttpsError('internal', 'Internal Server Error');
  }
});
