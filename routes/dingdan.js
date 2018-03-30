const express = require('express');
const router = express.Router();
const Shopping_car = require('../controllers/shopping_car');
const Order = require('../controllers/order');
const auth=require('../middleware/auth');

    /* GET users listing. */
router.get('/',auth, Shopping_car.index);
/*购物车登陆验证*/
// router.post('/userlogin',auth);
/*加入购物车*/
router.post('/add',auth,Shopping_car.add);
/*删除购物车商品*/
router.post('/delete', Shopping_car.delete);
/*更新购物车*/
router.get('/update', Shopping_car.update);
/*确认支付*/
router.post('/order',auth,Order.index);
/*显示购物车数量*/
router.get('/show',auth,Shopping_car.show);
/*直接购买*/
router.post('/create',auth,Order.create);
module.exports = router;
