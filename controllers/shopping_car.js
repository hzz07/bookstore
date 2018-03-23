//购物车

const ShoppingCar ={
    index:(req,res,next)=>{

        res.render('pay_gouwuche',{
            title:'购物车'
        })
        //购物车列表
    },
    add:(req,res,next)=>{
        //书籍id
        //数量
    },
    update:(req,res,next)=>{
        //购物车id /书籍id -用户id
        // 数量
        //
    },
    delete:(req,res,next)=>{
        //书籍id
        //数量
    },

}
module.exports=ShoppingCar;