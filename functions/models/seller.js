const { firestore } = require('firebase-admin');
const admin = require('firebase-admin');
const db = admin.firestore();

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
  dashboard: {
    totalWealth: 0,
    updatedAt: new Date()
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
        return 'กรุณาล็อคอินใหม่';
      } else if (!seller.storeName) {
        return 'กรุณากรอกชื่อร้านค้า';
      } else if (!seller.firstName) {
        return 'กรุณากรอกชื่อ';
      } else if (!seller.lastName) {
        return 'กรุณากรอกนามสกุล';
      } else if (!seller.tel) {
        return 'กรุณากรอกเบอร์โทร';
      } else if (!seller.citizenId) {
        return 'กรุณากรอกเลขบัตรประชาชน';
      } else if (!seller.address.detail) {
        return 'กรุณากรอกที่อยู่';
      } else if (!seller.address.subDistrict) {
        return 'กรุณากรอกตำบล/แขวง';
      } else if (!seller.address.district) {
        return 'กรุณากรอกอำเภอ/เขต';
      } else if (!seller.address.province) {
        return 'กรุณากรอกจังหวัด';
      } else if (!seller.address.postal) {
        return 'กรุณากรอกรหัสไปรษณีย์';
      } else if (!seller.bankAccount.accountName) {
        return 'กรุณากรอกชื่อบัญชี';
      } else if (!seller.bankAccount.accountNumber) {
        return 'กรุณากรอกเลขบัญชี';
      } else if (!seller.bankAccount.bank) {
        return 'กรุณาเลือกธนาคาร';
      }

      const bankRef = await db.collection('banks').doc(seller.bankAccount.bank);
      const snapshot = await bankRef.get();
      if (!snapshot.exists) {
        return 'ธนาคารไม่ถูกต้อง';
      } else {
        seller.bankAccount.bank = db.doc('banks/' + seller.bankAccount.bank);
      }

      const sellerRef = await db.collection('sellers').doc(seller.uid);
      const sellerSnapshot = await sellerRef.get();
      if (sellerSnapshot.exists) {
        return 'บัญชีนี้เคยสมัครเป็นผู้ขายแล้ว';
      }

      // check duplicate storeName
      const storeRef = await db.collection('sellers').where('storeName', '==', seller.storeName);
      const storeSnapshot = await storeRef.get();
      if (storeSnapshot.size) {
        return 'ชื่อร้านค้าถูกใช้งานแล้ว';
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  Seller.prototype.create = (async () => {
    try {
      const sellersDocRef = await db.collection('sellers').doc(seller.uid).set({
        storeName: seller.storeName,
        firstName: seller.firstName,
        lastName: seller.lastName,
        tel: seller.tel,
        citizenId: seller.citizenId,
        address: seller.address,
        bankAccount: seller.bankAccount,
        uid: seller.uid,
        valid: false,
        dashboard: seller.dashboard,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      sellersDocRef.id = seller.uid;
      return sellersDocRef;
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  Seller.updateDashboard = (async (item, transaction) => {
    try {
      const sellerDocRef = db.collection('sellers').doc(item.sid);
      const increaseBy = firestore.FieldValue.increment(item.cost);
      await transaction.update(sellerDocRef, {
        dashboard: {
          totalWealth: increaseBy,
          updatedAt: new Date()
        }
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  return Seller;
})();

module.exports = Seller;
