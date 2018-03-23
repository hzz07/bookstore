const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 *评论模型
 */
const EvaluationSchema = new Schema({
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    book_id:{
        type:Schema.Types.ObjectId,
        ref:'Book'
    },
    order_id:{
        type:Schema.Types.ObjectId,
        ref:'Order'
    },
    content:{
        type:String,
        default:''
    },
    score:{
        type:Number,
        default:5
    },
    status:{
        type:Number,
        default:1
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

const Evaluation = mongoose.model('Evaluation',EvaluationSchema);
module.exports = Evaluation;