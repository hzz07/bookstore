const express = require('express');
const router = express.Router();
const Register =require('../controllers/register');

/*用户页面*/
router.get('/',Register.index);
/*用户注册*/
router.post('/',Register.creater);

module.exports = router;
