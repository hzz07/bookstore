const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 *订单模型
 */
const OrderSchema = new Schema({
    order_num:{
        type:String,
        default:''
    },
    user_id:{
      type:Schema.Types.ObjectId,
      ref:'User'
    },
    book:[
        {
            id:Schema.Types.ObjectId,
            name:String,
            img:String,
            num:Number,
            price:Number,
            total_price:Number
        }
    ],
    total_price:{
        type:Number,
        default:0
    },
    pay_type:{
        type:Number,
        default:0
    },
    pay_at:{
        type:Date,
        default:null
    },
    status:{
        type:Number,
        default:0
    },
    receive:{
        name:String,
        phone:String,
        address:String
    },
    send:{
        kd_name:String,
        kd_num:String,
        kd_at:Date
    },
    create_at:{
        type:Date,
        default:Date.now
    },
    update_at:{
        type:Date,
        default:Date.now
    },
    delete_at:{
        type:Date,
        default:null
    },
});

const Order = mongoose.model('Order',OrderSchema);
module.exports = Order;