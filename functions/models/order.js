const admin = require('firebase-admin');
const db = admin.firestore();

var order = {
  id: '',
  sid: '',
  uid: '',
  item: {
    name: '',
    description: '',
    cost: 0,
    covers: [],
    files: [],
    tags: [],
    storeName: ''
  }
};

var Item = (() => {
  function Order (data) {
    order.id = data.id
    order.sid = data.sid
    order.uid = data.uid
    order.item = data.item
  }
  Order.prototype.create = (async () => {
    try {
      return;
    } catch (error) {
      throw error;
    }
  });

  return Item;
})();

module.exports = Item
