const admin = require('firebase-admin')
const db = admin.firestore()

var seller = {
  uid: '',
  storeName: '',
  firstName: '',
  lastName: '',
  tel: '',
  citizenId: '',
  address: {
    detail: '',
    subDistrict: '',
    district: '',
    province: '',
    postal: ''
  },
  bankAccount: {
    accountName: '',
    accountNumber: '',
    bank: ''
  },
  valid: false
};

var Seller = (() => {
  function Seller (data) {
    seller.uid = data.uid;
    seller.storeName = data.storeName;
    seller.firstName = data.firstName;
    seller.lastName = data.lastName;
    seller.tel = data.tel;
    seller.citizenId = data.citizenId;
    seller.address = data.address;
    seller.bankAccount = data.bankAccount;
    seller.valid = true;
  }

  Seller.prototype.validate = (async () => {
    try {
      if (!seller.uid) {
        throw('กรุณาล็อคอินใหม่');
      } else if (!seller.storeName) {
        throw('กรุณากรอกชื่อร้านค้า');
      } else if (!seller.firstName) {
        throw('กรุณากรอกชื่อ');
      } else if (!seller.lastName) {
        throw('กรุณากรอกนามสกุล');
      } else if (!seller.tel) {
        throw('กรุณากรอกเบอร์โทร');
      } else if (!seller.citizenId) {
        throw('กรุณากรอกเลขบัตรประชาชน');
      } else if (!seller.address.detail) {
        throw('กรุณากรอกที่อยู่');
      } else if (!seller.address.subDistrict) {
        throw('กรุณากรอกตำบล/แขวง');
      } else if (!seller.address.district) {
        throw('กรุณากรอกอำเภอ/เขต');
      } else if (!seller.address.province) {
        throw('กรุณากรอกจังหวัด');
      } else if (!seller.address.postal) {
        throw('กรุณากรอกรหัสไปรษณีย์');
      } else if (!seller.bankAccount.accountName) {
        throw('กรุณากรอกชื่อบัญชี');
      } else if (!seller.bankAccount.accountNumber) {
        throw('กรุณากรอกเลขบัญชี');
      } else if (!seller.bankAccount.bank) {
        throw('กรุณากรอกธนาคาร');
      }

      const bankRef = await db.collection('banks').doc(seller.bankAccount.bank);
      const snapShot = await bankRef.get();
      if (!snapShot.exists) {
        throw('ธนาคารไม่ถูกต้อง');
      } else {
        seller.bankAccount.bank = db.doc('banks/' + seller.bankAccount.bank);
      }

      // check duplicate storeName
      const storeRef = await db.collection('stores').where('storeName', '==', seller.storeName)
      const storeSnapshot = await storeRef.get();
      if (storeSnapshot.size) {
        throw('ชื่อร้านค้าถูกใช้งานแล้ว');
      }
    } catch (error) {
      return error;
    }

    return;
  });

  Seller.prototype.create = (async () => {
    try {
      const result = {
        sellerId: '',
        storeId: ''
      }
      await db.runTransaction(async (transaction) => {
        const sellersDocRef = db.collection('sellers').doc()
        const storesDocRef = db.collection('stores').doc()
        await transaction.create(sellersDocRef, {
          firstName: seller.firstName,
          lastName: seller.lastName,
          tel: seller.tel,
          citizenId: seller.citizenId,
          address: seller.address,
          bankAccount: seller.bankAccount,
          uid: seller.uid,
          valid: false
        })
        await transaction.create(storesDocRef, {
          seller: db.doc('sellers/' + sellersDocRef.id),
          storeName: seller.storeName
        })
        result.sellerId = sellersDocRef.id
        result.storeId = storesDocRef.id
      })
      return result
    } catch (error) {
      return error;
    }
  });

  return Seller;
})();

module.exports = Seller
  