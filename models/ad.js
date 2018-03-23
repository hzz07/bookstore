const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * 广告模型
 */
const AdSchema = new Schema({
    title:{
        type:String,
        default:''
    },
    img:{
        type:String,
        default:''
    },
    link:{
        type:Number,
        default:0
    },
    url:{
        type:String,
        default:''
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

const Ad = mongoose.model('Ad',AdSchema);
module.exports = Ad;