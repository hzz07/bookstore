const UserModel=require('../../models/user');


const User={
    /*用户信息*/
    index:(req,res,next)=>{
        let user=req.session.loginUser;
            console.log(doc);
            res.json({
                status:1,
                result:user
            })
        }).catch(err=>{
            res.json({
                status:0,
                result:err
            })


        //
    },
    /*保存信息*/
    save:(req,res,next)=>{
        //性别
        // 联系方式
        // 用户id
        //昵称
        //头像

    },
    /*修改密码*/
    password:(req,res,next)=>{
        //用户id

        //旧密码
        //新密码
        //确认密码
    }
}
module.exports=User;




