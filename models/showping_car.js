const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 *购物车模型
 */
const ShoppingSchema = new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    book_id:{
        type:Schema.Types.ObjectId,
        ref:'Book'
    },
    num:{
        type:Number,
        default:0
    },
    create_at:{
        type:Date,
        default:Date.now
    },
    update_at:{
        type:Date,
        default:Date.now
    }
});

const Shopping_car = mongoose.model('Shopping_car',ShoppingSchema);
module.exports = Shopping_car;