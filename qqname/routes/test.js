var express = require('express');
var router = express.Router();

// 引入管理员数据库模型
var adminModel = require('../models/adminModel')


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('test/index');
});


/* 添加管理员*/
router.get('/adminAdd',function(req,res){
    // 响应模版
    res.render('test/adminAdd');
})
/* 验证码*/
router.get('/code',function(req,res){
    // 引入验证码模块
    var captchapng = require('captchapng');

        var p = new captchapng(80,30,parseInt(Math.random()*9000+1000)); // width,height,numeric captcha
        p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
        p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
 
        var img = p.getBase64();
        var imgbase64 = new Buffer(img,'base64');
        res.send(imgbase64);
    })



// 添加管理员数据
router.post('/adminInsert',function(req,res){
    // 引入管理员数据模型
    var adminModel = require('../models/adminModel');
    // 引入 md5 模块
    var md5 = require('md5');

    // 取消用户名和密码两端的空白字符
    var username = req.body.username.trim()
    // md5 加密
    var password = md5(req.body.password.trim());

    // userdata 组装用户数据
    var userdata = {
        username: username,
        password: password,
        tel:req.body.tel
    }
    // 获取用户名
    var username = req.body.username.trim();

    adminModel.create(userdata,function (err) {
        // adminModel.findOne({ username: username }, function (err, data) {
        //     sonsole.log(data);
            // if(data==data){
            //     res.send('用户名已被占用 ');
            // }else{
            //     res.send('添加管理员成功 ');
                
            // }
            if(err){
                    res.send('添加管理员失败 ');
                }else{
                    res.send('添加管理员成功 ');
                    
                 }
        })
    // })
});


module.exports = router;
