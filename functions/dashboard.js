const functions = require('firebase-functions').region('asia-southeast2');
const admin = require('firebase-admin');
const db = admin.firestore();
const async = require('async');
const seller = require('./models/seller');

function dispatchListOrder (list, transaction) {
  list.forEach((doc) => {
    const o = doc.data();
    seller.updateDashboard(o.sid, o.item.cost, transaction);
    transaction.update({
      withdraw: true,
      updatedAt: new Date()
    });
  });
}

exports.updateDashboard = functions.pubsub.schedule('every 1 minutes').onRun(async (_) => {
  const orderRef = db.collection('orders').where('status', '==', 'S')
                                        .where('withdraw', '==', false);
  const snapsnot = await orderRef.orderBy('updatedAt', 'asc').limit(100).get();

  // parallel
  let listDoc1 = [];
  let listDoc2 = [];
  for (let index = 0; index < snapsnot.size; index++) {
    const doc = snapsnot[index];
    if (index < (snapsnot.size / 2)) {
      listDoc1.push(doc);
    } else {
      listDoc2.push(doc);
    }
  }
  async.parallel([
    function (callback) {
      db.runTransaction((transaction) => {
        dispatchListOrder(listDoc1, transaction)
      }).then(() => {
        console.log('update dashboard list1 success');
        callback(null, 'list1');
      })
    },
    function (callback) {
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
