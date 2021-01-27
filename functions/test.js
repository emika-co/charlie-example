const functions = require('firebase-functions').region('asia-southeast2');
const redis = require('redis');

const client = redis.createClient(6379, '10.248.39.75');
client.on('error', (err) => {
  console.log(err);
});

exports.test = functions.runWith({
  vpcConnector: 'cloud-functions-vpc',
  vpcConnectorEgressSettings: 'PRIVATE_RANGES_ONLY'
}).https.onRequest((_, res) => {
  console.log(client.connected);
  res.status(204).send();
});