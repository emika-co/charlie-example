const functions = require('firebase-functions').region('asia-southeast2');
const admin = require('firebase-admin');
const db = admin.firestore();
const Seller = require('./models/seller');

async function dispatchListOrder (listDoc, transaction) {
  try {
    var sellerDashboard = [];
    var updateOrders = [];
    var updateSellerDashboard = [];

    listDoc.forEach((doc) => {
      const o = doc.data();
      let sellerIndex = sellerDashboard.findIndex((s) => {
        if (s.sid) {
          return (s.sid === o.sid)?s:null;
        }
      });
      if (sellerIndex !== -1) {
        sellerDashboard[sellerIndex].cost += o.item.cost;
      } else {
        sellerDashboard.push({
          sid: o.sid,
          cost: o.item.cost
        });
      }
      updateOrders.push(doc.id);
    });
    console.log('UpdateOrders: ' + updateOrders);

    for (let index = 0; index < sellerDashboard.length; index++) {
      const s = sellerDashboard[index];
      const dashboardRef = db.collection('sellerDashboards').doc(s.sid);
      const snapshot = await transaction.get(dashboardRef);
      if (snapshot.exists) {
        let dashboard = snapshot.data();
        dashboard.totalWealth += s.cost;
        updateSellerDashboard.push({
          sid: s.sid,
          totalWealth: dashboard.totalWealth
        });
      }
    }
    console.log('sellerDashboard: ' + sellerDashboard);

    var now = new Date();
    for (let index = 0; index < updateOrders.length; index++) {
      const docId = updateOrders[index];
      let orderRef = db.collection('orders').doc(docId);
      await transaction.update(orderRef, {
        withdraw: true,
        updatedAt: now
      });
      console.log('updating tx: ' + docId);
    }

    for (let index = 0; index < updateSellerDashboard.length; index++) {
      const doc = updateSellerDashboard[index];
      let ref = db.collection('sellerDashboards').doc(doc.sid);
      await transaction.update(ref, {
        totalWealth: doc.totalWealth,
        updatedAt: now
      });
      console.log('updating seller dashboard: ' + doc.sid);
    }
    console.log('Update completed');
    return;
  } catch (error) {
    throw error;
  }
}

exports.updateDashboard = functions.runWith({
  vpcConnector: 'cloud-functions-vpc',
  vpcConnectorEgressSettings: 'PRIVATE_RANGES_ONLY'
}).pubsub.schedule('every 1 minutes').onRun(async () => {
  try {
    const orderRef = db.collection('orders').where('status', '==', 'S')
                                        .where('withdraw', '==', false);
    const snapshot = await orderRef.orderBy('updatedAt', 'asc').limit(100).get();
    if (snapshot.size) {
      return db.runTransaction(async (transaction) => {
        return await dispatchListOrder(snapshot, transaction);
      }).then(() => {
        console.log('committed');
      }).catch((err) => {
        console.log('error: ' + err);
      });
    }
  } catch (error) {
    console.error(error);
  }
});
