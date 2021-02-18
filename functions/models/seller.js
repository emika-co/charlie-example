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

  Seller.prototype.id = (async () => {
    return seller.uid;
  });

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
      if (seller.storeName.length > 32) {
        return 'ชื่อร้านต้องมีความยาวตัวอักษรไม่เกิน 32 ตัว';
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
      console.error(error);
      throw error;
    }
  });

  Seller.prototype.create = (async (transaction) => {
    try {
      const sellersDocRef = db.collection('sellers').doc(seller.uid);
      await transaction.create(sellersDocRef, {
        storeName: seller.storeName,
        firstName: seller.firstName,
        lastName: seller.lastName,
        tel: seller.tel,
        citizenId: seller.citizenId,
        address: seller.address,
        bankAccount: seller.bankAccount,
        uid: seller.uid,
        valid: false,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return seller.uid;
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  Seller.updateDashboard = (async (sid, cost, transaction) => {
    const dashboardRef = db.collection('sellerDashboards').doc(sid);
    const snapshot = await dashboardRef.get();
    if (snapshot.exists) {
      let dashboard = snapshot.data();
      dashboard.totalWealth += cost;
      transaction.update(dashboardRef, {
        totalWealth: dashboard.totalWealth,
        updatedAt: new Date()
      });
    }
  });

  return Seller;
})();

module.exports = Seller;
