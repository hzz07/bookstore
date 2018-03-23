const bookModel=require('../models/book');
const AuthorModel=require('../models/author');
const CategoryModel=require('../models/category');
/*书籍*/
const Book={
    //书籍详情
    get:(req,res,next)=>{
        let id=req.params.id;


        bookModel.findOne({_id:id}).populate('author_id','name content').populate('category_id','name').then(doc=>{
            console.log(doc);
            let bookdetail=doc;
            bookModel.find({category_id:bookdetail.category_id}).populate('author_id','name content').sort({order_cnt: 'desc'}).then(doc=>{
                let categorybook=doc;
                bookModel.find({category_id:bookdetail.category_id}).populate('author_id','name content').sort({create_at: 'desc'}).then(doc=>{
                    let categoryxinbook=doc;
                    bookModel.find({author_id:bookdetail.author_id}).populate('author_id','name content').sort({order_cnt: 'desc'}).then(doc=>{
                        let articlebook=doc;
                        bookModel.find({author_id:bookdetail.author_id}).populate('author_id','name content').sort({order_cnt: 'desc'}).then(doc=>{
                            let articleNewbook=doc;
                            res.render('bookdetails',{
                                bookdetail:bookdetail,
                                categorybook:categorybook,
                                categoryxinbook:categoryxinbook,
                                articlebook:articlebook,
                                articleNewbook:articleNewbook
                            })
                        })

                    })

                })

            })

        })

        //书籍ID
        //书籍详情
        //书籍分类畅销榜
        //作者书籍


        //书籍评论
    }
}

module.exports =Book;