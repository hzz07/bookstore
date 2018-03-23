/*登陆*/
const UserModel = require('../models/user');
const md5=require('md5');
const Login = {

    //登陆页
    index: (req, res, next) => {
        res.render('login', {
            title: '登陆'
        })
    },
    //登陆
    login: (req, res, next) => {
        let email = req.body.email;
        let password = md5(md5(req.body.password).substr(0, 3));
        UserModel.findOne({email: email}).then(doc => {
            if (doc) {
                let user = doc;
                if (user.password == password != "") {
                    req.session.loginUser = user;
                    res.redirect('/');
                }
                else {
                    req.flash('error', '密码错误!');
                    res.redirect('/login');
                }
            }
            else {
                req.flash('error', '用户不存在！');
                res.redirect('/login');
            }
        })
    },
    logout: (req, res, next) => {


    }
}


module.exports = Login