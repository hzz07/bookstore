const express = require('express');
const router = express.Router();
const Login =require('../controllers/login');

/* GET users listing. */
router.get('/',Login.index);

router.post('/',Login.login);

router.get('/logout',Login.logout);
module.exports = router;
