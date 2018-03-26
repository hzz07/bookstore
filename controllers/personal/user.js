const UserModel=require('../../models/user');
const md5=require('md5');
const fs = require('fs');

const User={
    /*用户信息*/
    index:(req,res,next)=>{
        let user=req.session.loginUser;
        UserModel.findOne({_id:user._id}).then(doc=>{
            console.log(doc);
            res.json({
                status:1,
                result:doc
            })
        }).catch(err=>{
            res.json({
                status: 0,
                result:err
            })
        })
    },
    /*保存信息*/
    update:(req,res,next)=>{
        let user=req.session.loginUser;
        user.nickname=req.body.nickname;
        user.sex=req.body.newsex;
        user.phone=req.body.phone;
        let imgData = req.body.imgdata;
        let suffix = req.body.suffix;
        let base64Date=imgData.replace(/^data:image\/\w+;base64,/,"");
        var dataBuffer = new Buffer(base64Date, 'base64');

        if (base64Date) {
            //将缓冲区写入到文件中
            let filename = Date.now() + suffix;
            fs.writeFile("./public/uploads/" + filename, dataBuffer, function (err) {
                    if (err) {
                        res.json({
                            'status': 0,
                            'msg': '修改失败！'
                        })
                    }{
                    user.avatar = filename;
                    UserModel.update({_id: user._id}, user).then(doc => {
                        res.json({
                            'status': 1,
                            'msg': '修改成功！'
                        })
                    }).catch(err => {
                        res.json({
                            'status': 0,
                            'msg': '修改失败！'
                        })
                    });
                }
            });
        }else {
            UserModel.update({_id: user._id}, user).then(doc => {
                res.json({
                    'status': 1,
                    'msg': '修改成功！'
                })
            }).catch(err => {
                res.json({
                    'status': 0,
                    'msg': '修改失败！'
                })
            });
        }
    },
        //性别
        // 联系方式
        // 用户id
        //昵称
        //头像

    /*修改密码*/
    updatewd:(req,res,next)=>{
        let password=md5(md5(req.body.password).substr(0, 3));
        let newpassword=md5(md5(req.body.newpassword).substr(0, 3));
        let user=req.session.loginUser;


            if(password!=user.password){
                res.json({
                    'status':0,
                    'msg': '原密码输入不正确！'
                })
            }else if(newpassword==password){
                res.json({
                    'status':0,
                    'msg': '新密码不能跟原密码一样！'
                })
            } else {
                UserModel.update({_id:user._id},{password:newpassword}).then(doc=>{
                res.json({
                    'status': 1,
                    'msg': '修改成功！'
                })
                }).catch(err => {
                    res.json({
                        'status': 0,
                        'msg': '修改失败！'
                    })
                });
            }



    }
}
module.exports=User;




