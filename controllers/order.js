const UserModel=require('../models/user');
const shoppingModel=require('../models/showping_car');
const bookModel=require('../models/book');

/*订单*/

const Order = {
    /*从购物车创建订单*/
    index: (req, res, next) => {
        let id=[]
            id=req.body.shop_car;
        let user = req.session.loginUser;
        if(id){
            let orArr = [];
            if(id.length>24){
                for (var i in id) {
                    orArr.push({
                        _id: id[i]
                    })
                }
            }else{
                orArr.push({
                    _id: id
                })
            }

            shoppingModel.find({$or: orArr}).populate({path: 'book_id', populate: {path: 'author_id'}}).then(doc => {

                let list = [];
                let total_num = 0;
                let total_price = 0;
                for (let i = 0; i < doc.length; i++) {
                    list.push({
                        _id:doc[i]._id,
                        shopping_car_id: doc[i]._id,
                        book_id: doc[i].book_id._id,
                        name: doc[i].book_id.name,
                        author: doc[i].book_id.author_id.name,
                        price: parseInt(doc[i].book_id.price) / 100,
                        num: doc[i].num,
                        total_price: (parseInt(doc[i].book_id.price) * parseInt(doc[i].num)) / 100
                    });
                    total_num += parseInt(doc[i].num);
                    total_price += parseInt(doc[i].book_id.price) * parseInt(doc[i].num);
                }
                UserModel.findOne({_id: user._id}).then(arr => {
                    let address = arr.address;
                    res.render('pay_jiesuan', {
                        list: list,
                        total_num: total_num,
                        total_price: total_price / 100,
                        address: address
                    })
                })
            })
        }
        else{
            res.render('pay_jiesuan', {
                list: 0,
                total_num: 0,
                total_price: '你当前没有选择书籍，请重新选择！',
                address: 0
            })
        }
    },
    create: (req, res, next) => {
        const id =req.body.id;
        console.log(id);
        const numm =parseInt(req.body.num);
        console.log()
        let user=req.session.loginUser;
        bookModel.findOne({_id:id}).populate({path: 'author_id'}).then(doc=>{
            let list = [];
            let total_num = 0;
            let total_price = 0;
                list.push({
                    _id:id,
                    book_id: id,
                    name:doc.name,
                    author: doc.author_id.name,
                    price: parseInt(doc.price) / 100,
                    num: numm,
                    total_price: (parseInt(doc.price) * numm) / 100
                });
                total_num=numm;
                total_price= (parseInt(doc.price) * numm);

                UserModel.findOne({_id: user._id}).then(arr => {
                    let address = arr.address;
                        console.log(list);
                        res.render('pay_jiesuan', {
                            list: list,
                            total_num: total_num,
                            total_price: total_price / 100,
                            address: address
                        })
                    })


        })
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
    evaluation: (req, res, next) => {

    },
    delete: (req, res, next) => {
        //订单id
    }

}
module.exports = Order;