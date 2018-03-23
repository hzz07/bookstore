const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 *幻灯模型
 */
const SlideSchema = new Schema({
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

const Slide = mongoose.model('Slide',SlideSchema);
module.exports = Slide;