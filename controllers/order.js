/*订单*/
const Order = {
    /*创建订单*/
    create: (req, res, next) => {
        //书籍id（数组）
        //数量 数组
        //地址
        //生成订单
    },
    /*订单支付*/
    pay: (req, res, next) => {
        //订单号
    },

    /*支付成功*/
    paySuccess: (req, res, next) => {
        //订单信息
    },
    //评价
    evaluation:(req, res, next)=>{

    },
    delete:(req, res, next)=>{
        //订单id
    }

}
module.exports = Order;