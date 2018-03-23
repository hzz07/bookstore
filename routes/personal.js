const express = require('express');
const router = express.Router();
const Collect=require('../controllers/personal/collect');
const User=require('../controllers/personal/collect');
const Auth=require('../middleware/auth');

/* GET users listing. */

/*个人中心 书架*/
router.get('/book',Auth,Collect.index);

router.get('/user',User.index)


module.exports = router;
