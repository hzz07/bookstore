const express = require('express');
const router = express.Router();
const Collect=require('../controllers/personal/collect');
const User=require('../controllers/personal/user');
const Auth=require('../middleware/auth');
const upload=require('../library/upload');
const Address=require('../controllers/personal/address')

/* GET users listing. */

/*个人中心 书架*/
router.get('/book',Auth,Collect.index);
/*获取个人信息*/
router.get('/user',User.index)
/*更新个人信息*/
router.post('/user',upload.single('img'),User.update)
/*修改个人密码*/
router.post('/updatewd',User.updatewd);
/*个人地址获取*/
router.get('/address',Address.index);
/*添加地址*/
router.post('/add_address',Address.add);
/*获取单个地址*/
router.get('/get_address',Address.get);
/*更新地址*/
router.post('/update',Address.update);
/*删除地址*/
router.post('/del',Address.del);

module.exports = router;
