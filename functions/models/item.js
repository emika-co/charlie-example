const admin = require('firebase-admin');
const db = admin.firestore();
const { validate } = require('uuid');
const uuidValidate = validate;

var item = {
  id: '',
  name: '',
  description: '',
  cost: 0,
  covers: [],
  sid: '',
  files: [],
  tags: [],
  storeName: ''
};

var Item = (() => {
  function Item (data) {
    item.id = data.id;
    item.name = data.name;
    item.description = data.description;
    item.cost = data.cost;
    item.sid = data.uid;
    item.covers = data.covers;
    item.files = data.files;
    item.tags = data.tags;
  }

  Item.prototype.validate = (async () => {
    try {
      if (!item.sid) {
        return 'กรุณาล็อคอินใหม่';
      } else if (!item.id) {
        return 'กรุณารีเฟรชเพจแล้วทำรายการใหม่';
      } else if (!item.name) {
        return 'กรุณากรอกชื่อสินค้า';
      } else if (!item.description) {
        return 'กรุณากรอกรายละเอียด';
      } else if (!item.cost) {
        return 'กรุณากรอกราคาสินค้า';
      } else if (!item.covers.length || !Array.isArray(item.covers)) {
        return 'กรุณาอัพโหลดรูปสินค้า';
      } else if (!item.files.length || !Array.isArray(item.files)) {
        return 'กรุณาอัพโหลดไฟล์';
      } else if (!uuidValidate(item.id)) {
        return 'Invalid ID';
      }
      // check type
      if (typeof item.cost !== 'number') {
        return 'ราคาสินค้าต้องเป็นตัวเลขเท่านั้น';
      } else if (item.cost.toString().match(/[-+][0-9]+\.[0-9]+$/)) {
        return 'ราคาสินค้าไม่ถูกต้อง';
      }
      // check sellers
      const sellersDocRef = await db.collection('sellers').doc(item.sid);
      const snapshot = await sellersDocRef.get();
      if (!snapshot.exists) {
        throw 'ไม่พบร้านค้า';
      }
      const seller = snapshot.data();
      item.storeName = seller.storeName;
    } catch (error) {
      throw error;
    }
  });

  Item.prototype.create = (async () => {
    try {
      const itemDocRef = await db.collection('items').doc(item.id).set({
        sid: item.sid,
        name: item.name,
        description: item.description,
        cost: item.cost,
        covers: item.covers,
        files: item.files,
        tags: item.tags,
        storeName: item.storeName,
        sold: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      itemDocRef.id = item.id;
      return itemDocRef;
    } catch (error) {
      throw error;
    }
  });

  Item.prototype.public = (async () => {
    try {
      const itemDocRef = await db.collection('items').doc(item.id);
      const doc = await itemDocRef.get();
      if (doc.exists) {
        const i = doc.data();
        return {
          id: item.id,
          name: i.name,
          description: i.description,
          cost: i.cost,
          covers: i.covers,
          tags: i.tags,
          storeName: i.storeName,
          sold: i.sold,
          createdAt: i.createdAt,
          updatedAt: i.updatedAt
        }
      }
      return null;
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  Item.prototype.update = ((data) => {
    const itemDocRef = db.collection('items').doc(data.id);
    return db.runTransaction((transaction) => {
      return transaction.get(itemDocRef).then((doc) => {
        if (!doc.exists) {
          throw 'Item does not exists';
        }
        transaction.update(itemDocRef, {
          name: data.name,
          description: data.description,
          cost: data.cost,
          covers: data.covers,
          files: data.files,
          tags: data.tags,
          updatedAt: new Date()
        });
      });
    }).then(() => {
      // success
      return null;
    }).catch((error) => {
      console.log(error)
      throw error;
    });
  });

  return Item;
})();

module.exports = Item
