const express = require('express');
const router = express.Router();
const Login =require('../controllers/login');

/* GET users listing. */
router.get('/',Login.index);

router.post('/',Login.login);
module.exports = router;
