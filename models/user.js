const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * 用户模型
 */
const UserSchema = new Schema({
    email:{
      type:String,
      default:''
    },
    password:{
        type:String,
        default:''
    },
    nickname:{
        type:String,
        default:''
    },
    avatar:{
        type:String,
        default:''
    },
    sex:{
        type:Number,
        default:1
    },
    phone:{
        type:String,
        default:''
    },
    status:{
        type:Number,
        default:1
    },
    address:[
        {
            name:String,
            phone:String,
            address:String
        }
    ],
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

const User = mongoose.model('User',UserSchema);
module.exports = User;