var express = require('express');
var router = express.Router();
const sellers = require('../controllers/sellers.controller')

router.post('/', sellers.create);

module.exports = router;
