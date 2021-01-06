const functions = require('firebase-functions');
const Item = require('./models/item');

exports.showItem = functions.https.onCall(async (data, _) => {
  const i = new Item({
    id: data.itemId
  })
  try {
    const data = await i.public()
    return data
  } catch (error) {
    throw new functions.https.HttpsError('internal', 'Internal Server Error');
  }
})
