const functions = require('firebase-functions').region('asia-southeast2');
const { https } = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();
const Item = require('./models/item');
const Inventory = require('./models/inventory');
const Order = require('./models/order');
const Payment = require('./models/payment');

// get item from inventory
exports.getItem = functions.runWith({
  vpcConnector: 'cloud-functions-vpc',
  vpcConnectorEgressSettings: 'PRIVATE_RANGES_ONLY'
}).https.onCall(async (data, context) => {
  try {
    const item = await Inventory.get({
      itemId: data.itemId,
      uid: context.auth.uid
    });
    return item;
  } catch (error) {
    console.error(error);
    throw new https.HttpsError('internal', 'Internal Server Error');
  }
});

exports.createItem = functions.runWith({
  vpcConnector: 'cloud-functions-vpc',
  vpcConnectorEgressSettings: 'PRIVATE_RANGES_ONLY'
}).https.onCall(async (data, context) => {
  data.sid = context.auth.uid;
  const i = new Item(data);
  // validate
  const invalid = await i.validate();
  if (invalid) {
    throw new https.HttpsError('invalid-argument', invalid);
  }
  // create
  try {
    const docRef = await i.create();
    return {
      _id: docRef.id
    }
  } catch (error) {
    console.error(error);
    throw new https.HttpsError('internal', 'Internal Server Error');
  }
});

// show item public
exports.showItem = functions.runWith({
  vpcConnector: 'cloud-functions-vpc',
  vpcConnectorEgressSettings: 'PRIVATE_RANGES_ONLY'
}).https.onCall(async (data, _) => {
  try {
    const item = await Item.find(data.itemId);
    if (item) {
      return item.public();
    }
    return null;
  } catch (error) {
    console.error(error);
    throw new https.HttpsError('internal', 'Internal Server Error');
  }
});

exports.updateItem = functions.runWith({
  vpcConnector: 'cloud-functions-vpc',
  vpcConnectorEgressSettings: 'PRIVATE_RANGES_ONLY'
}).https.onCall(async (data, context) => {
  data.sid = context.auth.uid;
  const i = new Item(data);
  // validate
  const invalid = await i.validate();
  if (invalid) {
    throw new https.HttpsError('invalid-argument', invalid);
  }
  try {
    return await i.update({
      name: data.name,
      description: data.description,
      cost: data.cost,
      covers: data.covers,
      files: data.files,
      tags: data.tags
    });
  } catch (error) {
    console.error(error);
    throw new https.HttpsError('internal', 'Internal Server Error');
  }
});

exports.buyItem = functions.runWith({
  vpcConnector: 'cloud-functions-vpc',
  vpcConnectorEgressSettings: 'PRIVATE_RANGES_ONLY'
}).https.onCall(async (data, context) => {
  var email = '';
  if (!context.auth) {
    throw new https.HttpsError('unauthenticated', 'กรุณาล็อคอิน');
  } else if (context.auth.token.email) {
    email = context.auth.token.email;
  } else if (data.email) {
    email = data.email;
  } else {
    throw new https.HttpsError('unauthenticated', 'กรุณากรอกอีเมลล์');
  }
  try {
    const payment = await Payment.find(data.paymentId);
    if (!payment.exists) {
      throw new https.HttpsError('not-found', 'โปรดระบุวิธีการชำระเงิน');
    }
    const item = await Item.find(data.itemId);
    if (!item) {
      throw new https.HttpsError('not-found', 'ไม่พบรายการ');
    }
    return db.runTransaction(async (transaction) => {
      // create order
      let data = {
        sid: item.sid(),
        uid: context.auth.uid,
        email: email,
        item: {
          id: item.id(),
          name: item.name(),
          description: item.description(),
          cost: item.cost(),
          covers: item.covers(),
          files: item.files(),
          tags: item.tags(),
          storeName: item.storeName()
        }
      };
      const order = new Order(data);
      const orderResult = await order.create(transaction);
      data.id = orderResult.id;
      const result = await payment.start(data);
      result.oid = orderResult.id;
      result.uid = context.auth.uid;
      result.createdAt = new Date();
      result.updatedAt = new Date();
      // store result to thaiQR collection
      const thaiQRDocRef = db.collection('thaiQR').doc(orderResult.id);
      transaction.create(thaiQRDocRef, result);
      return result;
    });
  } catch (error) {
    console.error(error);
    throw new https.HttpsError('internal', 'Internal Server Error');
  }
});
