const admin = require('firebase-admin');
admin.initializeApp();
const sellers = require('./sellers');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.createSellers = sellers.createSellers;
exports.createItem = sellers.createItem;
