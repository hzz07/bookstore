const UserModel = require('../../models/user');

const Address = {

    //列表

    index: (req, res, next) => {
        let user = req.session.loginUser;
        UserModel.findOne({_id: user._id}).then(doc => {
            res.json({
                'status': 1,
                 result: doc,
                'msg': '修改成功！'
            })
        }).catch(err => {
            res.json({
                'status': 0,
                'msg': '修改失败！'
            })
        })
    },
    //添加地址
    add: (req, res, next) => {
        let useraddress = {};
        useraddress.name = req.body.name;
        useraddress.phone = req.body.phone;
        useraddress.address = req.body.address;
        let user = req.session.loginUser;
        UserModel.findOne({_id:user._id}).then(doc=>{
            let addresslist=doc.address;
            addresslist.push(useraddress);
            UserModel.update({_id: user._id}, {address:addresslist}).then(doc => {
                res.json({
                    'status': 1,
                    result: doc,
                    'msg': '添加成功！'
                })
            }).catch(err => {
                res.json({
                    'status': 0,
                    'msg': '修改失败！'
                })
            })
        })


        // UserModel.findOne({_id: user._id}).then(doc => {
        //     // let addresslist = doc.address;
        //     // addresslist.push(useraddress);
        //
        // }).catch(err => {
        //     console.log('查无此人' + err);
        //
        // })
        //地址
    },
    /*获取当前需要修改地址*/
    get: (req, res, next) => {
        let index = req.query.id;
        let dizhi = '';
        let user = req.session.loginUser;
        UserModel.findOne({_id: user._id}).then(doc => {
            let addresslist = doc.address;
            let dizhi=addresslist[index];
            console.log(dizhi);
            res.json({
                result: dizhi,
                'status': 1
            })
        })
    },
    //修改地址
    update: (req, res, next) => {
        let user = req.session.loginUser;
        let index = req.body.index;
        console.log(index);
        let addresslist = {};
        addresslist.address = req.body.address;
        addresslist.phone = req.body.phone;
        addresslist.name = req.body.name;
        UserModel.findOne({_id: user._id}).then(doc => {
            let newaddresslist = doc.address;
            newaddresslist[index] = addresslist;
            console.log(newaddresslist);
            UserModel.update({_id: user._id}, {address:newaddresslist}).then(doc => {
                res.json({
                    'status': 1,
                    result: doc,
                    'msg': '修改地址成功！'
                })
            }).catch(err => {
                res.json({
                    'status': 0,
                    'msg': '修改失败！'
                })
            })


            //     res.json({
            //         'status': 1,
            //         result: doc,
            //         'msg': '修改成功！'
            //     })
            // }).catch(err => {
            //     res.json({
            //         'status': 0,
            //         'msg': '修改失败！'
            //     })
            // })
            // }).catch(err => {
            //     console.log('查无此人' + err);
            //
        })


        //下标
        //姓名
        //手机号
        //地址
    },
    //删除
    del: (req, res, next) => {
        Array.prototype.del=function(n) {　//n表示第几项，从0开始算起。
            //prototype为对象原型，注意这里为对象增加自定义方法的方法。
            if(n<0)　//如果n<0，则不进行任何操作。
                return this;
            else
                return this.slice(0,n).concat(this.slice(n+1,this.length));
            /*
            　concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。
            　这里就是返回this.slice(0,n)/this.slice(n+1,this.length)
             组成的新数组，这中间，刚好少了第n项。
            　slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。
            */
        }
        let index = req.body.index;
        let user = req.session.loginUser;
        UserModel.findOne({_id: user._id}).then(doc => {
            let newaddresslist = doc.address;
            console.log(newaddresslist.length)
            let listadress=newaddresslist.del(index);
            UserModel.update({_id: user._id},{address:listadress}).then(doc => {
                res.json({
                    'status': 1,
                    'msg': '删除成功！'
                })
            }).catch(err => {
                res.json({
                    'status': 0,
                    'msg': '删除失败！'
                })
            })
        })
    }
}
module.exports = Address;