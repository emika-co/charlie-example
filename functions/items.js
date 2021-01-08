const functions = require('firebase-functions');
const Item = require('./models/item');

exports.createItem = functions.https.onCall(async (data, context) => {
  data.uid = context.auth.uid;
  const i = new Item(data);
  // validate
  const invalid = await i.validate();
  if (invalid) {
    throw new functions.https.HttpsError('invalid-argument', invalid);
  }
  // create
  try {
    const docRef = await i.create();
    return {
      _id: docRef.id
    }
  } catch (error) {
    console.log(error);
    throw new functions.https.HttpsError('internal', 'Internal Server Error');
  }
});

exports.showItem = functions.https.onCall(async (data, _) => {
  const i = new Item({
    id: data.itemId
  });
  try {
    const data = await i.public();
    return data;
  } catch (error) {
    throw new functions.https.HttpsError('internal', 'Internal Server Error');
  }
});

exports.updateItem = functions.https.onCall(async (data, context) => {
  data.uid = context.auth.uid;
  const i = new Item(data);
  // validate
  const invalid = await i.validate();
  if (invalid) {
    throw new functions.https.HttpsError('invalid-argument', invalid);
  }
  try {
    return await i.update({
      id: data.id,
      name: data.name,
      description: data.description,
      cost: data.cost,
      covers: data.covers,
      files: data.files,
      tags: data.tags
    });
  } catch (error) {
    throw new functions.https.HttpsError('internal', 'Internal Server Error');
  }
});
