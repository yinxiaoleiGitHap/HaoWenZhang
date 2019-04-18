// 前台的控制器// 声明一个 前台的控制器 模块
var indexController = {};
// 引入 数据库模型 模块
var itemModel = require('../models/itemModel');
var articleModel = require('../models/articleModel');
var loveModel = require('../models/loveModel');
// 首页
indexController.index = function (req, res, next) {
	// 获取友签名类列表
	itemModel.find().sort({ order: 1 }).exec(function (err, data) {
		// console.log(data)
		if (err) {
			console.log('数据添加数据失败');
		} else {
			getArticleDataList(0)
			// 根据 itemId 去查 5条签名
			function getArticleDataList(i) {
				articleModel.find({ itemId: data[i]._id }).limit(5).exec(function (error, data1) {
					data[i].articleList = data1;
					// console.log(data1)
					if (i < data.length - 1) {
						// 继续查询下一个分类的 10 条签名
						getArticleDataList(++i);
					} else {
						// 获取友签名类列表
						loveModel.find().sort({ order: 1 }).exec(function (err, data2) {
							// console.log(data2)
							lovelist = data2;
							if (err) {
								console.log('数据添加数据失败');
							} else {
								// console.log(data);
								//  响应模版 分配数据
								res.render('index', { itemlist: data });
							}
						})
					}
				});
			}
		}
	})
}
// 签名

// indexController.qinglv = function (req, res, next) {
// 	// 签名类列表
// 	itemModel.find().sort({ order: 1 }).exec(function (err, data) {
// 		// console.log(data);
// 		if (err) {
// 			console.log('数据添加数据失败');
// 		} else {
// 			itemlist = data;
// 			itemModel.find({ _id: req.params._id }).sort({ order: 1 }).exec(function (err, data) {
// 				// namelist:data;
// 				// console.log(data)
// 				if (err) {
// 					console.log('数据添加数据失败');
// 				} else {
// 					getArticleDataList(0)
// 					// 根据 itemId 去查 1条签名的内容
// 					function getArticleDataList(i) {
// 						articleModel.find({ itemId: data[i]._id }).limit(10).exec(function (error, data1) {
// 							// console.log(data);
// 							//  响应模版 分配数据
// 							res.render('qinglv', { qinglvlist: data1, itemlist: itemlist, namelist: data });
// 							// console.log(data1)
// 						});
// 					}
// 				}
// 			})
// 		}
// 	})
// }
indexController.qinglv = function (req, res, next) {
	itemModel.find().sort({ order: 1 }).exec(function (err, data) {
		// console.log(data)
		if (err) {
			console.log('数据添加数据失败');
		} else {
			itemModel.find({ _id: req.params._id }).exec(function (err, data1) {
				fenleilist = data1;
				console.log(data1)
				getArticleDataList(0)
				// 根据 itemId 去查 1条签名的内容
				function getArticleDataList(i) {
					articleModel.find({ itemId: data1[i]._id }).limit(10).exec(function (error, data3) {
						//  响应模版 分配数据
						loveModel.find({}, function (err, lovedata) {
							res.render('qinglv', { itemlist: data, lovelist: lovedata, contentlist: data3 });
						})
					})
				}
			})
		}
	});
}

// 暴露控制器
module.exports = indexController;