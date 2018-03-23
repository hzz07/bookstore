const SlideModel = require('../models/slide');
const BookModel = require('../models/book');
const Auther = require('../models/author');
/*首页*/
const Home = {
    index: (req, res, next) => {
        let silde = '';
        let tuijianBook = '';
        let changxiao = '';
        let xinshu = '';
        console.log(req.session.loginUser);
        SlideModel.find().then(doc => {
            silde = doc;

        });
        BookModel.find({is_tui: 1}).populate('author_id', 'name').then(doc => {
            tuijianBook = doc;
            res.render('index', {
                tui_book: tuijianBook,
            })
        })

        //幻灯
        //推荐
        //广告
        //最新
        // 排行榜（畅销榜）
    },
    /*推荐*/
    tui: (req, res, next) => {
        let page = req.query.page ? req.query.page : 1;
        let count = 0;
        let limit = 7;
        let totalPage = 0;
        let bookchangxiao = ''
        BookModel.find().sort({order_cnt: 'desc'}).count().then(doc => {
            count = doc;
            totalPage = Math.ceil(count / limit);
            BookModel.find().skip((page - 1) * limit).limit(limit).populate('author_id', 'name').sort({order_cnt: 'desc'}).then(doc => {
                bookchangxiao = doc;
                res.render('recommend', {
                    page: page,
                    totalPage: totalPage,
                    changxiaobook: bookchangxiao
                })
            })

        })


        //书籍列表（分页）
        //排行榜

    },
    /*新书榜*/
    news: (req, res, next) => {
        //书籍列表（分页）
        //排行榜
    },
    //分类页
    category: (req, res, next) => {
        res.render('classification', {
            title: '分类'
        })
        //分类列表
        //分类书籍（有分页，销量，评分，时间）
        //
    },
    /*排行榜*/
    rank: (req, res, next) => {
        res.render('rank')
    },
    ranking: (req, res, next) => {
        let page = req.query.page ? req.query.page : 1;
        let count = 0;
        let totalPage = 0;
        let limit = 7;
        BookModel.find().count().then(doc => {
            count = doc;
            totalPage = Math.ceil(count / limit)
            BookModel.find().skip((page - 1) * limit).limit(limit).populate('author_id', 'name').sort({order_cnt: 'desc'}).then(doc => {
                let changxiaobang = doc;
                BookModel.find().skip((page - 1) * limit).limit(limit).populate('author_id', 'name').sort({create_at: 'desc'}).then(doc => {
                    let xinshubang = doc;
                    console.log(changxiaobang);
                    res.json({
                        status: 1,
                        changxiaobang: changxiaobang,
                        xinshubang: xinshubang,
                        page: page,
                        totalPage: totalPage,
                    })
                }).catch(err => {
                    res.json({
                        status: 0,
                        msg: '获取失败！'
                    })
                })
            })
        })

        //书籍列表（分页，畅销/新书）
    },
    /*搜索*/
    rearch: (req, res, next) => {
        //书籍列表（分页）
    }
}

module.exports = Home;