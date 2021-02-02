const admin = require('firebase-admin');
const db = admin.firestore();
const uuid = require('uuid');
const uuidv4 = uuid.v4;

var order = {
  id: '',
  sid: '',
  uid: '',
  email: '',
  item: {
    id: '',
    name: '',
    description: '',
    cost: 0,
    covers: [],
    tags: [],
    storeName: ''
  },
  status: '',
  withdraw: false
};

var status = {
  pending: 'P',
  success: 'S',
  error: 'E',
  cancel: 'C'
}

var Order = (() => {
  function Order (data) {
    order.id = data.id;
    order.sid = data.sid;
    order.uid = data.uid;
    order.email = data.email;
    order.item.id = data.item.id;
    order.item.name = data.item.name;
    order.item.description = data.item.description;
    order.item.cost = data.item.cost;
    order.item.covers = data.item.covers;
    order.item.tags = data.item.tags;
    order.item.storeName = data.item.storeName;
    order.status = data.status;
    order.withdraw = data.withdraw;
  }

  Order.prototype.create = (async (transaction) => {
    try {
      const oid = uuidv4();
      let data = {
        sid: order.sid,
        uid: order.uid,
        email: order.email,
        item: {
          id: order.item.id,
          name: order.item.name,
          description: order.item.description,
          cost: order.item.cost,
          covers: order.item.covers,
          tags: order.item.tags,
          storeName: order.item.storeName
        },
        status: status.pending,
        withdraw: false,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const orderDocRef = db.collection('orders').doc(oid);
      await transaction.set(orderDocRef, data);
      return {
        id: oid
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  Order.prototype.item = (() => {
    return order.item;
  });
  Order.prototype.uid = (() => {
    return order.uid;
  });
  Order.prototype.email = (() => {
    return order.email;
  });

  Order.prototype.success = (async (transaction) => {
    try {
      const orderDocRef = db.collection('orders').doc(order.id);
      return await transaction.update(orderDocRef, {
        status: status.success,
        updatedAt: new Date()
      });
    } catch (error) {
      throw error;
    }
  });

  Order.prototype.error = (async (transaction) => {
    try {
      const orderDocRef = db.collection('orders').doc(order.id);
      return await transaction.update(orderDocRef, {
        status: status.error,
        updatedAt: new Date()
      });
    } catch (error) {
      throw error;
    }
  });

  Order.prototype.cancel = (async (transaction) => {
    try {
      const orderDocRef = db.collection('orders').doc(order.id);
      return await transaction.update(orderDocRef, {
        status: status.cancel,
        updatedAt: new Date()
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  Order.find = (async (oid) => {
    try {
      const orderDocRef = db.collection('orders').doc(oid);
      const snapshot = await orderDocRef.get();
      if (snapshot.exists) {
        let result = snapshot.data();
        const o = new Order({
          id: snapshot.id,
          sid: result.sid,
          uid: result.uid,
          item: result.item
        })
        return o;
      }
      return null;
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  return Order;
})();

module.exports = Order
