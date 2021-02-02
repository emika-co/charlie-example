const functions = require('firebase-functions').region('asia-southeast2');
const admin = require('firebase-admin');
const db = admin.firestore();
const async = require('async');
const Seller = require('./models/seller');

function dispatchListOrder (list, transaction) {
  if (Array.isArray(list)) {
    list.forEach((doc) => {
      const o = doc.data();
      Seller.updateDashboard(o.sid, o.item.cost, transaction);
      const orderRef = db.collection('orders').doc(doc.id);
      transaction.update(orderRef, {
        withdraw: true,
        updatedAt: new Date()
      });
    });
  }
}

exports.updateDashboard = functions.runWith({
  vpcConnector: 'cloud-functions-vpc',
  vpcConnectorEgressSettings: 'PRIVATE_RANGES_ONLY'
}).pubsub.schedule('every 1 hours').onRun(async (_) => {
  const orderRef = db.collection('orders').where('status', '==', 'S')
                                        .where('withdraw', '==', false);
  const snapsnot = await orderRef.orderBy('updatedAt', 'asc').limit(100).get();

  let listDoc1 = [];
  let listDoc2 = [];
  let i = 0;
  const snapshotSize = snapsnot.size;
  snapsnot.forEach((doc) => {
    console.log(doc.id)
    if (i < (snapshotSize / 2)) {
      listDoc1.push(doc);
    } else {
      listDoc2.push(doc);
    }
    i++;
  });

  async.parallel([
    async function (callback) {
      db.runTransaction((transaction) => {
        dispatchListOrder(listDoc1, transaction)
      }).then(() => {
        console.log('update dashboard list1 success');
        callback(null, 'list1');
      })
    },
    async function (callback) {
      db.runTransaction((transaction) => {
        dispatchListOrder(listDoc2, transaction)
      }).then(() => {
        console.log('update dashboard list2 success');
        callback(null, 'list2');
      })
    }
  ], (err, results) => {
    if (err) {
      console.log(err);
    }
    if (results) {
      console.log(new Date());
      console.log(results);
      return null;
    }
  });
});
