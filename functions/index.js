const admin = require('firebase-admin');
admin.initializeApp();
const sellers = require('./sellers');
const items = require('./items');
const payments = require('./payments');
const dashboard = require('./dashboard');
const functions = require('firebase-functions');
const Mail = require('./models/mail');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.createSellers = sellers.createSellers;
exports.getItem = items.getItem;
exports.createItem = items.createItem;
exports.showItem = items.showItem;
exports.updateItem = items.updateItem;
exports.buyItem = items.buyItem;
exports.paymentConfirmation = payments.paymentConfirmation;
exports.updateDashboard = dashboard.updateDashboard;
