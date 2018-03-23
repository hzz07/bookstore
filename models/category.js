const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 *书籍分类模型
 */
const CategorySchema = new Schema({
    name:{
      type:String,
      default:''
    },
    sort:{
        type:Number,
        default:0
    },
    pid:{
        type:Schema.Types.ObjectId,
        default:null
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

const Category = mongoose.model('Category',CategorySchema);
module.exports = Category;