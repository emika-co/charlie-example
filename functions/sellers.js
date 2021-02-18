const functions = require('firebase-functions').region('asia-southeast2');
const { https } = require('firebase-functions');
const Seller = require('./models/seller');
const admin = require('firebase-admin');
const db = admin.firestore();

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
    var batch = db.batch();
    var sid = await s.create(batch);
    const dashboardRef = db.collection('sellerDashboards').doc(sid);
    await batch.create(dashboardRef, {
      totalWealth: 0,
      updatedAt: new Date()
    });
    await batch.commit();
    return {
      _id: sid
    }
  } catch (error) {
    throw new https.HttpsError('internal', 'Internal Server Error');
  }
});
