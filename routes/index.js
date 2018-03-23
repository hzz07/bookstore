var express = require('express');
var router = express.Router();
const Home =require('../controllers/home');
const Book=require('../controllers/book');
/* GET home page. */
router.get('/', Home.index);

//推荐书籍
router.get('/recommend', Home.tui);

//书籍排行榜
router.get('/rank', Home.rank);
router.get('/rank/rank', Home.ranking);

/*分类*/
router.get('/classification', Home.category);

/*详情页*/

router.get('/bookdetails/:id',Book.get);
module.exports = router;
