const UserModel = require('../models/user');
const md5 = require("md5");
const fs = require('fs');
//注册
const Register = {
    //注册页面

    index: (req, res, next) => {
        res.render('register', {
            title: '注册'
        })
    },
    // 注册操作

    /*注册页面*/


    creater: (req, res, next) => {
        const youxiang = req.body.youxiang;
        const nicheng = req.body.nicheng;
        /*MD5加密*/
        const mima = md5(md5(req.body.mima).substr(0, 3));

        console.log('邮箱' + youxiang, '昵称' + nicheng, '密码' + mima);
        UserModel.findOne({email: youxiang}).then(function (person) {
            const responseData = {
                code: 0,
            };
            /*邮箱未注册  返回前台 1*/
            if (person == null) {
                const users = new UserModel({
                    email: youxiang,
                    nickname: nicheng,
                    password: mima
                });
                users.save();
                req.session.loginUser={email:users.email,password:users.password};
                console.log(req.session.loginUser);
                responseData.code = 1;
                res.json(responseData);

            }
            /*已注册 返回前台 -1*/
            else {
                responseData.code = -1;
                res.json(responseData);
            }
        });

    },

}
module.exports = Register;