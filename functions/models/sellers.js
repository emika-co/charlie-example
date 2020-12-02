const admin = require('firebase-admin')
const db = admin.firestore()

var Seller = (() => {
  function Seller (seller) {
    this.storeName = seller.storeName;
    this.firstName = seller.firstName;
    this.lastName = seller.lastName;
    this.tel = seller.tel;
    this.citizenId = seller.citizenId;
    this.address = seller.address;
    this.bankAccount = seller.bankAccount;
    this.valid = true;
  }

  Seller.prototype.validate = (async () => {
    try {
      if (!this.storeName) {
        throw('storeName');
      } else if (!this.firstName) {
        throw('firstName');
      } else if (!this.lastName) {
        throw('lastName');
      } else if (!this.tel) {
        throw('tel');
      } else if (!this.citizenId) {
        throw('citizenId');
      } else if (!this.address.detail) {
        throw('detail');
      } else if (!this.address.subDistrict) {
        throw('subDistrict');
      } else if (!this.address.district) {
        throw('district');
      } else if (!this.address.province) {
        throw('province');
      } else if (!this.address.postal) {
        throw('postal');
      } else if (!this.bankAccount.accountName) {
        throw('accountName');
      } else if (!this.bankAccount.accountNumber) {
        throw('accountNumber');
      } else if (!this.bankAccount.bank) {
        throw('bank');
      }

      const bank = await db.collection('banks').doc(this.bankAccount.bank);
      const snapShot = await bank.get();
      if (!snapShot.exists) {
        throw('bank');
      } else {
        this.bankAccount.bank = db.doc('banks/' + this.bankAccount.bank);
      }
    } catch (error) {
      return error;
    }

    return;
  });

  Seller.prototype.create = (async () => {
    try {
      const docRef = await db.collection('sellers').add({
        storeName: this.storeName,
        firstName: this.firstName,
        lastName: this.lastName,
        tel: this.tel,
        citizenId: this.citizenId,
        address: this.address,
        bankAccount: this.bankAccount
      });
      return docRef;
    } catch (error) {
      return error;
    }
  });

  return Seller;
})();

module.exports = Seller
  