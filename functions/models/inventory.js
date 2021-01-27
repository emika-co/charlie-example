const admin = require('firebase-admin');
const db = admin.firestore();

var inventory = {
  sid: '',
  uid: '',
  itemId: '',
  name: '',
  description: '',
  cost: 0,
  covers: [],
  files: [],
  tags: [],
  storeName: ''
};

let Inventory = class {
  constructor (data) {
    inventory.sid = data.sid;
    inventory.uid = data.uid;
    inventory.itemId = data.itemId;
    inventory.name = data.name;
    inventory.description = data.description;
    inventory.cost = data.cost;
    inventory.covers = data.covers;
    inventory.files = data.files;
    inventory.tags = data.tags;
    inventory.storeName = data.storeName;
  }
  
  static async get (data) {
    try {
      console.log(inventory)
      const itemRef = db.collection('inventories')
                        .where('uid', '==', data.uid)
                        .where('itemId', '==', data.itemId);
      const snapshot = await itemRef.get();
      let item = {};
      if (snapshot.size) {
        snapshot.forEach((doc) => {
          console.log(item.id)
          item = doc.data();
          item.id = doc.id;
        });
      }
      return item;
    } catch (error) {
      throw error;
    }
  }

  async create (transaction) {
    const inventoryDocRef = db.collection('inventories').doc();
    return await transaction.set(inventoryDocRef, {
      sid: inventory.sid,
      uid: inventory.uid,
      itemId: inventory.itemId,
      name: inventory.name,
      description: inventory.description,
      cost: inventory.cost,
      covers: inventory.covers,
      files: inventory.files,
      tags: inventory.tags,
      storeName: inventory.storeName,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
}

module.exports = Inventory
