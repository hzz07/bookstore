const shoppingModel=require('../models/showping_car');
const UserModel=require('../models/user');
const OrderModel=require('../models/order');
const moment=require('moment');
const utl=require('../library/utl');
const Alipay=require('../library/alipay');
const bookModel=require('../models/book');
const path = require('path');
/*结算*/
const Clean={
    /*结算页*/


    index:(req,res,next)=>{
        let shopcarId=[];
        let user=req.session.loginUser;
        shopcarId=req.body.id;
        console.log(shopcarId);
        let adress_id=req.body.address;
        let num=req.body.num;
        let orArr = [];
        if(shopcarId.length>24){
            for (var i in shopcarId) {
                orArr.push({
                    _id: shopcarId[i]
                })
            }
        }else{
            orArr.push({
                _id: shopcarId
            })
        }
        let list=[];
        let total_num = 0;
        let total_price = 0;
        let receive = {
            name: user.address[adress_id].name,
            phone: user.address[adress_id].phone,
            address: user.address[adress_id].address,
        };
        let order_num=moment().format('YYYYMMDDHHmmss')+parseInt(Math.random()*10000);

        shoppingModel.find({$or:orArr}).populate({path: 'book_id', populate: {path: 'author_id'}}).then(doc => {
            if(doc.length==0){
                bookModel.find({$or:orArr}).populate({path: 'author_id'}).then(doc=>{

                    for (let i = 0; i < doc.length; i++) {
                        list.push({
                            id: doc[i]._id,
                            name: doc[i].name,
                            img: doc[i].img,
                            author: doc[i].author_id.name,
                            price: parseInt(doc[i].price) / 100,
                            num: num,
                            total_price: (parseInt(doc[i].price) * parseInt(num) / 100)
                        });
                        total_num:num;
                        total_price=(parseInt(doc[i].price)*parseInt(num)/100)

                    }
                    shoppingModel.remove({$or:orArr}).then(doc=>{
                        OrderModel.create({
                            order_num:order_num,
                            user_id:user._id,
                            book:list,
                            total_price: total_price,
                            total_num: total_num,
                            receive: receive

                        }).then(doc=>{
                            res.render('pay_zhifu', {
                                order_num:order_num,
                                list: list,
                                total_num: num,
                                total_price: total_price,
                                address: receive
                            })
                        })
                    })
                })
            }else {
                console.log(doc + 'aaa');
                for (let i = 0; i < doc.length; i++) {
                    list.push({
                        id: doc[i].book_id._id,
                        name: doc[i].book_id.name,
                        img: doc[i].book_id.img,
                        author: doc[i].book_id.author_id.name,
                        price: parseInt(doc[i].book_id.price) / 100,
                        num: doc[i].num,
                        total_price: (parseInt(doc[i].book_id.price) * parseInt(doc[i].num)) / 100
                    });
                    total_num += parseInt(doc[i].num);
                    total_price += parseInt(doc[i].book_id.price) * parseInt(doc[i].num);
                }
                ;
                shoppingModel.remove({$or: orArr}).then(doc => {
                    OrderModel.create({
                        order_num: order_num,
                        user_id: user._id,
                        book: list,
                        total_price: total_price,
                        total_num: total_num,
                        receive: receive

                    }).then(doc => {
                        res.render('pay_zhifu', {
                            order_num: order_num,
                            list: list,
                            total_num: total_num,
                            total_price: total_price / 100,
                            address: receive
                        })
                    })
                })
            }
        })
        //书籍Id（数组）
        //数量（数组）
        //用户地址
    },
    pay:(req,res,next)=> {
        let order_num = req.body.order_num;
        OrderModel.findOne({order_num: order_num}).then(doc => {
            res.render('pay_dingdan', {
                order: doc
            })
        })
    },

    paydown:(req,res,next)=>{
        let order_num = req.body.order_num;
        let pay_type=req.body.pay_type;
        if(pay_type==0){
            var ali = new Alipay({
                appId: '2016091100485103',
                notifyUrl: 'http://127.0.0.1:3001/',
                rsaPrivate: path.resolve('./key/private_key.pem'),
                rsaPublic: path.resolve('./key/alipay_publish_key.pem'),
                sandbox: true,
                signType: 'RSA2'
            });
            var url = ali.webPay({
                body: "ttt",
                subject: "ttt1",
                outTradeId: new Date().toString(),
                timeout: '90m',
                amount: "0.1",
                sellerId: '',
                product_code: 'FAST_INSTANT_TRADE_PAY',
                goods_type: "1",
                return_url: "http://127.0.0.1:3001/",
            })
            var url_API = 'https://openapi.alipaydev.com/gateway.do?' + url;
            res.redirect(url_API);
            // OrderModel.findOne({order_num: order_num}).then(doc => {
            //     var ali = new Alipay({
            //         appId: '2016091100485103',
            //         notifyUrl: 'http://127.0.0.1:3001/',
            //         rsaPrivate: path.resolve('./key/private_key.pem'),
            //         rsaPublic: path.resolve('./key/alipay_publish_key.pem'),
            //         sandbox: true,
            //         signType: 'RSA2'
            //     });
            //     var url = ali.webPay({
            //         body: "书籍购买",
            //         subject: '书籍购买',
            //         outTradeId: doc.order_num,
            //         timeout: '90m',
            //         amount: "0.1",
            //         sellerId: '',
            //         product_code: 'FAST_INSTANT_TRADE_PAY',
            //         goods_type: "1",
            //         return_url: "http://127.0.0.1:3001/",
            //     })
            //     var url_API = 'https://openapi.alipaydev.com/gateway.do?' + url;
            //     res.redirect(url_API);
            // })
        }else {
            OrderModel.update({order_num: order_num},{pay_type:pay_type,status:1}).then(doc => {
                res.render('zhifudown', {
                    order: doc
                })
            })
        }

    }
}
module.exports=Clean