const express = require('express');
const router = express.Router();
const clean = require('../controllers/clean');
const Auth=require('../middleware/auth');

/* GET users listing. */
router.post('/', clean.index);
/*加入购物车*/
/*选择支付方式*/
router.post('/pay', clean.pay);

/*完成支付*/
/*支付成功*/
router.post('/paysuccess',clean.paydown);

module.exports = router;
