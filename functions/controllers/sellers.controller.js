const admin = require('firebase-admin')
const db = admin.firestore()
const Seller = require('../models/sellers')

exports.create = async (req, res) => {
  try {
    const s = new Seller(req.body);
    await s.validate();
    const doc = await s.create()
    return res.status(200).send({
      message: '',
      payload: {
        _id: doc.id
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return res.status(500).send({
        message: 'Internal Server Error',
        payload: null
      });
    } else {
      return res.status(422).send({
        message: 'Invalid infomation',
        payload: { err }
      })
    }
  }
}
