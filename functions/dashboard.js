const functions = require('firebase-functions').region('asia-southeast2');
const admin = require('firebase-admin');
const db = admin.firestore();
const Seller = require('./models/seller');

async function dispatchListOrder (listDoc) {
  var batch = db.batch();
  var sellerDashboard = [];
  listDoc.forEach(async (doc) => {
    const o = doc.data();
    let index = sellerDashboard.findIndex((s) => {
      if (s.sid) {
        return (s.sid === o.sid)?s:null;
      }
    });
    if (index !== -1) {
      sellerDashboard[index].cost += o.item.cost;
    } else {
      sellerDashboard.push({
        sid: o.sid,
        cost: o.item.cost
      });
    }
    const orderRef = db.collection('orders').doc(doc.id);
    await batch.update(orderRef, {
      withdraw: true,
      updatedAt: new Date()
    });
  });
  console.log(sellerDashboard);
  // create withdraw
  // update dashboard
  sellerDashboard.forEach(async (s) => {
    console.log('SID : ' + s.sid);
    await Seller.updateDashboard(s.sid, s.cost, batch);
  });

  console.log('committing');
  return await batch.commit();
}

exports.updateDashboard = functions.runWith({
  vpcConnector: 'cloud-functions-vpc',
  vpcConnectorEgressSettings: 'PRIVATE_RANGES_ONLY'
}).pubsub.schedule('every 1 minutes').onRun(async () => {
  try {
    const orderRef = db.collection('orders').where('status', '==', 'S')
                                        .where('withdraw', '==', false);
    const snapshot = await orderRef.orderBy('updatedAt', 'asc').limit(100).get();
    await dispatchListOrder(snapshot);
  } catch (error) {
    console.error(error);
  }
});
