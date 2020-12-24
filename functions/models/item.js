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
  uid: '',
  seller: '',
  files: [],
  tags: []
};

var Item = (() => {
  function Item (data) {
    item.id = data.id;
    item.name = data.name;
    item.description = data.description;
    item.cost = data.cost;
    item.uid = data.uid;
    if (data.covers) {
      item.covers = item.covers.concat(data.covers);
    }
    if (data.files) {
      item.files = item.files.concat(data.files);
    }
    if (data.tags) {
      item.tags = item.tags.concat(data.tags);
    }
  }

  Item.prototype.validate = (async () => {
    try {
      console.log(uuidValidate(item.id))
      if (!item.uid) {
        return 'กรุณาล็อคอินใหม่';
      } else if (!item.id) {
        return 'กรุณารีเฟรชเพจแล้วทำรายการใหม่';
      } else if (!item.name) {
        return 'กรุณากรอกชื่อสินค้า';
      } else if (!item.description) {
        return 'กรุณากรอกรายละเอียด';
      } else if (!item.cost) {
        return 'กรุณากรอกราคาสินค้า';
      } else if (!item.covers.length) {
        return 'กรุณาอัพโหลดรูปสินค้า';
      } else if (!item.files.length) {
        return 'กรุณาอัพโหลดไฟล์';
      } else if (!uuidValidate(item.id)) {
        return 'Invalid ID';
      }
      // check type
      if (typeof item.cost !== 'number') {
        return 'ราคาสินค้าต้องเป็นตัวเลขเท่านั้น';
      }
      // create ref
      const sellerRef = await db.collection('sellers').doc(item.uid);
      const snapshot = await sellerRef.get();
      if (!snapshot.exists){
        return 'กรุณาล็อคอินใหม่';
      } else {
        item.seller = db.doc('sellers/' + item.uid);
      }
    } catch (error) {
      throw error;
    }
  });

  Item.prototype.create = (async () => {
    try {
      const itemDocRef = await db.collection('items').doc(item.id).set({
        seller: item.seller,
        name: item.name,
        description: item.description,
        cost: item.cost,
        covers: item.covers,
        files: item.files,
        tags: item.tags
      });
      itemDocRef.id = item.id;
      return itemDocRef;
    } catch (error) {
      throw error;
    }
  });

  return Item;
})();

module.exports = Item
