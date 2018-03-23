const mongoose=require('mongoose');
const config=require('../config/index');

let uri='';
if(config.mongodb.auth){
    /*认证数据库*/
    uri=`mongodb://${config.mongodb.username}:${config.mongodb.password}@${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.dbname}`;
}else{
    /*非认证数据库*/
    // uri='mongodb://127.0.0.1:27017/bookstore';
    uri=`mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.dbname}`
}


const db=mongoose.connect(uri).then(()=>{
    console.log('数据库链接成功')
}).catch(err=>{
    console.log('数据库链接失败：' +err)
});

module.exports=db;