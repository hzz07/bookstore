const Auth =(req,res,next)=>{
    //登陆认证let user= req.session.loginUser;
    let user=req.session.loginUser;
    if(user){
        next();
    }else{
        res.redirect('/login')
    }
}
module.exports=Auth;
