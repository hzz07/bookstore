/*购物车模型*/
const shoppingModel=require('../models/showping_car');
//购物车
const ShoppingCar ={
    index:(req,res,next)=>{
        let user=req.session.loginUser;
        shoppingModel.find({user_id:user._id}).populate('book_id','name price').then(arr=>{
            console.log(arr)
            res.render('pay_gouwuche',{
                title:'购物车',list:arr
            })
        });
    },
    /*加入购物车*/
    add:(req,res,next)=>{
        const id =req.body.id;
        const numm =parseInt(req.body.num);
        let user=req.session.loginUser;
        shoppingModel.findOne({book_id:id}).then(arr=>{
            if(arr){
                shoppingModel.update({book_id:id},{num:parseInt(arr.num) + numm},{user_id:user._id}).then(doc => {
                    console.log(doc)
                    res.json({
                        status:1
                    })
                })
            }else{
                shoppingModel.create({
                    num:numm,book_id:id,user_id:user._id,

                }).then(doc=>{
                    res.json({
                        status:1
                    })
                });
            }
        });
    },
    /* 用户订单更新*/
    update:(req,res,next)=>{
        let id=req.query.id;
        let num=req.query.num;
        shoppingModel.update({_id:id},{num:num}).then(doc => {
            console.log(doc+'aaaaaa')
            res.json({
                status:1
            });
        });
    },
    /*点击加入购物车显示购物车*/
    show:(req,res,next)=>{
        shoppingModel.find({}).then(doc => {
            let sum = 0;
            for (let i = 0; i < doc.length; i++) {
                sum += parseInt(doc[i].num);
            }
            res.json({
                total_num: sum
            });
        });
    },


    /*复选框删除订单*/
    delete:(req,res,next)=>{
        //书籍id
        const a = req.body.data;
        if(a === null){
        }else{
            shoppingModel.remove({_id:a}).then(arr=>{
            })
        }
    },


};
module.exports=ShoppingCar;