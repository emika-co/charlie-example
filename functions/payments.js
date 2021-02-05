const functions = require('firebase-functions').region('asia-southeast2');
const { https } = require('firebase-functions');
const admin = require('firebase-admin');
const db = admin.firestore();
const Order = require('./models/order');
const Item = require('./models/item');
const Inventory = require('./models/inventory');
const Mail = require('./models/mail');

exports.paymentConfirmation = functions.runWith({
  vpcConnector: 'cloud-functions-vpc',
  vpcConnectorEgressSettings: 'PRIVATE_RANGES_ONLY'
}).https.onRequest(async (request, response) => {
  try {
    await db.collection('paymentConfirms').add({
      transactionId: request.body.transactionId?request.body.transactionId:'',
      amount: request.body.amount?request.body.amount:'',
      transactionDateandTime: request.body.transactionDateandTime?request.body.transactionDateandTime:'',
      currencyCode: request.body.currencyCode?request.body.currencyCode:'',
      transactionType: request.body.transactionType?request.body.transactionType:'',
      merchantId: request.body.merchantId?request.body.merchantId:'',
      terminalId: request.body.terminalId?request.body.terminalId:'',
      qrID: request.body.qrId?request.body.qrId:'',
      merchantPAN: request.body.merchantPAN?request.body.merchantPAN:'',
      consumerPAN: request.body.consumerPAN?request.body.consumerPAN:'',
      traceNo: request.body.traceNo?request.body.traceNo:'',
      authorizeCode: request.body.authorizeCode?request.body.authorizeCode:'',
      payeeProxyType: request.body.payeeProxyType?request.body.payeeProxyType:'',
      payeeProxyId: request.body.payeeProxyId?request.body.payeeProxyId:'',
      payeeAccountNumber: request.body.payeeAccountNumber?request.body.payeeAccountNumber:'',
      payeeName: request.body.payeeName?request.body.payeeName:'',
      payerProxyId: request.body.payerProxyId?request.body.payerProxyId:'',
      payerProxyType: request.body.payerProxyType?request.body.payerProxyType:'',
      payerName: request.body.payerName?request.body.payerName:'',
      payerAccountName: request.body.payerAccountName?request.body.payerAccountName:'',
      payerAccountNumber: request.body.payerAccountNumber?request.body.payerAccountNumber:'',
      billPaymentRef1: request.body.billPaymentRef1?request.body.billPaymentRef1:'',
      billPaymentRef2: request.body.billPaymentRef2?request.body.billPaymentRef2:'',
      billPaymentRef3: request.body.billPaymentRef3?request.body.billPaymentRef3:'',
      sendingBankCode: request.body.sendingBankCode?request.body.sendingBankCode:'',
      receivingBankCode: request.body.receivingBankCode?request.body.receivingBankCode:'',
      channelCode: request.body.channelCode?request.body.channelCode:'',
      paymentMethod: request.body.paymentMethod?request.body.paymentMethod:'',
      tenor: request.body.tenor?request.body.tenor:'',
      ippType: request.body.ippType?request.body.ippType:'',
      productCode: request.body.productCode?request.body.productCode:'',
      exchangeRate: request.body.exchangeRate?request.body.exchangeRate:'',
      equivalentAmount: request.body.equivalentAmount?request.body.equivalentAmount:'',
      equivalentCurrencyCode: request.body.equivalentCurrencyCode?request.body.equivalentCurrencyCode:'',
      companyId: request.body.companyId?request.body.companyId:'',
      invoice: request.body.invoice?request.body.invoice:'',
      note: request.body.note?request.body.note:'',
      createdAt: new Date(),
      updatedAt: new Date()
    });
    response.status(204).send();
    // should be run in queue
    if (request.body.billPaymentRef1 && request.body.billPaymentRef2 && request.body.billPaymentRef3) {
      const snapshot = await db.collection('thaiQR').where('data.ref1', '==', request.body.billPaymentRef1)
                                                  .where('data.ref2', '==', request.body.billPaymentRef2)
                                                  .where('data.ref3', '==', request.body.billPaymentRef3)
                                                  .get();
      if (snapshot.size) {
        if (snapshot.size > 1) {
          console.error('Found more than 1 thaiQR');
          return;
        }
        let thaiQR = {};
        snapshot.forEach((doc) => {
          thaiQR = doc.data();
        })
        const order = await Order.find(thaiQR.oid);
        await db.runTransaction(async (transaction) => {
          // get item by itemId
          const item = await Item.find(order.item().id);
          // update sold item
          await item.sold(transaction);
          // update order
          await order.success(transaction);
          // create inventories
          const inventory = new Inventory({
            sid: item.sid(),
            uid: order.uid(),
            itemId: item.id(),
            name: item.name(),
            description: item.description(),
            cost: item.cost(),
            covers: item.covers(),
            files: item.files(),
            tags: item.tags(),
            storeName: item.storeName()
          });
          await inventory.create(transaction);
          // send email
          const downloadLink = item.files();
          const m = new Mail({
            receiver: order.email(),
            downloadLink: downloadLink[0]
          });
          await m.send();
        })
      }
    }
  } catch (error) {
    console.error(error);
    throw new https.HttpsError('internal', 'Internal Server Error');
  }
});
