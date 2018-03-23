
/*收藏*/
const Collect ={
    //列表
    index:(req,res,next)=>{
        //列表（分页）
        res.render('user',{
            title:'书架'
        })
    },
    add:(req,res,ne)=>{
        //书籍id
    },
    delete:(req,res,next)=>{
        //收藏id/书籍id-用户id
    },

}
module.exports=Collect;
