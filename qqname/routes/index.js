var express = require('express');
var router = express.Router();

// 引入前台控制器
var indexController = require('../controllers/indexController');
// 引入前台控制器2
// var indexController = require('../controllers/indexControllers');


/* 首页  */
router.get('/',indexController.index);

/*每个 签名  */
router.get('/qinglv/:_id',indexController.qinglv);


module.exports = router;
