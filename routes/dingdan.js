const express = require('express');
const router = express.Router();
const Shopping_car =require('../controllers/shopping_car');

/* GET users listing. */
router.get('/',Shopping_car.index);

module.exports = router;
