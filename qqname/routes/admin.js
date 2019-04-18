var express = require('express');
var router = express.Router();

// 引入后台控制器
var adminController = require('../controllers/adminController');

// 登录页面
router.get('/login',adminController.login);
// 登录操作
router.post('/doLogin',adminController.doLodin);
//退出登录
router.get('/logout',adminController.logout);


/* 首页 */
router.get('/',adminController.Index);

// 添加分类
router.get('/itemAdd', adminController.itemAdd);
// 插入分类数据
router.post('/itemInsert', adminController.itemInsert);
//分类列表
router.get('/itemList', adminController.itemList);
// 修改分类页面
router.get('/itemEdit/:_id',adminController.itemEdit);
// 修改分类数据
router.post('/itemUpdate',adminController.itemUpdate);
// 删除分类
router.get('/itemRemove/:_id', adminController.itemRemove);

// 发布签名
router.get('/articleAdd',adminController.articleAdd);
// 插入签名数据
router.post('/articleInsert',adminController.articleInsert);
// 签名列表
router.get('/articleList', adminController.articleList)
// 删除签名
router.get('/articleRemove/:_id', adminController.articleRemove);
// 编辑签名
router.get('/articleEdit/:_id', adminController.articleEdit);
// 修改签名
router.post('/articleUpdate', adminController.articleUpdate)
// 修改签名的封面
router.post('/articleUpdateImage', adminController.articleUpdateImage);
// 验证码
router.get('/code', adminController.code);
//友情链接分类列表
router.get('/loveList', adminController.loveList);
// 添加分类
router.get('/loveAdd', adminController.loveAdd);
// 插入分类数据
router.post('/loveInsert', adminController.loveInsert);
// 修改分类页面
router.get('/loveEdit/:_id',adminController.loveEdit);
// 修改分类数据
router.post('/loveUpdate',adminController.loveUpdate);
// 删除分类
router.get('/loveRemove/:_id', adminController.loveRemove);
// 发布链接
router.get('/sendAdd',adminController.sendAdd);
// 插入链接数据
router.post('/sendInsert',adminController.sendInsert);
//链接列表
router.get('/sendList', adminController.sendList)
// 编辑链接
router.get('/sendEdit/:_id', adminController.sendEdit);
// 修改链接
router.post('/sendUpdate',adminController.sendUpdate);
// 删除链接
router.get('/sendRemove/:_id', adminController.sendRemove);
module.exports = router;
