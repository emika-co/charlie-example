const admin = require('firebase-admin');
const db = admin.firestore();
const thaiqr = require('./thaiqr');

var payment = {
  id: '',
  displayTH: '',
  imgCover: '',
  name: ''
};

let Payment = class {
  constructor (data) {
    payment.id = data.id;
    payment.displayTH = data.displayTH;
    payment.imgCover = data.imgCover;
    payment.name = data.name;
  }

  exists () {
    if (payment.id) {
      return true;
    }
    return false;
  }

  static async find (id) {
    try {
      const ref = db.collection('payments').doc(id);
      const snapshot = await ref.get();
      if (snapshot.exists) {
        let result = snapshot.data();
        result.id = snapshot.id;
        return new Payment(result);
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async start (order) {
    try {
      switch (payment.name) {
        case 'ThaiQR':
          try {
            const t = await thaiqr.createInstance('3e7db17d-3e4f-44a1-b895-9bbfb2d11fac');
            const response = await t.createQRCode(order);
            const responseData = response.data
            const result = {
              data: responseData.data,
              method: 'qr'
            }
            return result;
          } catch (error) {
            throw error;
          }
        default:
          break;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Payment;
