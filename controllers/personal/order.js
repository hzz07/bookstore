const OrderModel=require('../../models/order');
const Order={

    /*订单列表*/
    index:(req,res,next)=>{
        //状态
        OrderModel.find().then(doc=>{
            res.json({
                status:1,
                result:doc,
            })
        }).catch(err=>{
            res.json({
                status:0,
                result:err,
            })
        })

    },
    get:(req,res,next)=>{
        let order_num=req.body.order_num;

        //订单id
    },
    cancel:()=>{
        //订单id

        //验证
    },
    receive:(req,res,next)=>{
        //订单id
    }
}
module.exports = Order;