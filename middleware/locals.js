const BookModel=require('../models/book');

const Locals = (req, res, next) => {

    BookModel.find().populate('author_id','name').sort({order_cnt: 'desc'}).then(doc=>{
        res.locals.changxiao=doc;
        BookModel.find().populate('author_id','name').sort({updata: 'desc'}).then(doc=> {
            res.locals.xinshu = doc;
            res.locals.error = req.flash('error');
            res.locals.msg = req.flash('msg');
            res.locals.loginUser = req.session.loginUser;
            next();
        });
    });


};

module.exports = Locals;