// 声明一个 后台的控制器 模块
var adminController = {};

// 引入 数据库模型 模块
var itemModel = require('../models/itemModel');
var loveModel = require('../models/loveModel');
var sendModel = require('../models/sendModel');
var articleModel = require('../models/articleModel');

// 登录页面
adminController.login = function (req, res) {

    // 响应模版
    res.render('admin/login');
}
// 登录操作
adminController.doLodin = function (req, res) {
    // 引入管理员数据模型
    var adminModel = require('../models/adminModel');
    // 引入 md5 模块
    var md5 = require('md5');
    // 判断验证码
    if (req.body.code != req.session.code) {
        console.log('验证码错误');
        // 跳转到登录页面
        res.redirect('/admin/login');
        return;
    }
    // 获取用户名
    var username = req.body.username.trim();
    //获取 密码  并md5密码
    var password = md5(req.body.password.trim());

    // 判断用户名和密码
    adminModel.findOne({ username: username }, function (err, data) {
        if (data == null) {
            console.log('用户名或密码不正确');
            // alert('用户名或密码不正确');
            // 跳转到登录页面
            res.redirect('/admin/login');


        } else {
            // 判断密码是否正确
            if (password == data.password) {
                // 登录成功 把用户的信息存到session 里
                req.session.user = data;
                // 跳转到首页
                res.redirect('/admin');
            } else {

                console.log('密码错误');
                // alert('用户名或密码不正确');
                // 跳转到登录页面
                res.redirect('/admin/login');
            }
        }
    })
}
//退出登录
adminController.logout = function (req, res) {
    // 清空登录信息
    req.session.user = null;
    // 跳转到登录页面
    res.redirect('/admin/login');

}
// 首页
adminController.Index = function (req, res) {

    // 判断登没登陆             如果没登录   跳转到登录页面 
    
    // 响应模版
    res.render('admin/index')


}

// 添加所属分类
adminController.itemAdd = function (req, res) {
     // 判断登没登陆             如果没登录   跳转到登录页面 
     
    // 响应模版
    res.render('admin/itemAdd');
}

// 插入所属分类数据
adminController.itemInsert = function (req, res) {
     // 判断登没登陆             如果没登录   跳转到登录页面 
     
    // 插入数据到数据库
    itemModel.create(req.body, function (err) {
        if (err) {
            console.log('数据添加数据失败');
        } else {
            // res.send('数据插入成功');
            // 跳转到首页
            res.redirect('/admin/itemList');
        }
    })
}


//所属分类列表
adminController.itemList = function (req, res) {
     // 判断登没登陆             如果没登录   跳转到登录页面 
     
    // 获取所属分类列表
    itemModel.find().sort({ order: 1 }).exec(function (err, data) {
        if (err) {
            console.log('数据添加数据失败');
        } else {
            // 响应模版 分配数据
            res.render('admin/itemList', { datalist: data })
        }
    })

}


// 编辑所属分类的页面
adminController.itemEdit = function (req, res) {
     // 判断登没登陆             如果没登录   跳转到登录页面 
     

    // 查询要编辑的数据
    itemModel.find({ _id: req.params._id }, function (err, data) {
        if (err) {
            res.send('查询数据失败')
        } else {
            // 响应模版
            res.render('admin/itemEdit', { data: data[0] });
        }
    })
}

// 修改所属分类数据
adminController.itemUpdate = function (req, res) {
     // 判断登没登陆             如果没登录   跳转到登录页面 
     
    // 更新数据
    itemModel.update({ _id: req.body._id }, req.body, function (error) {
        // 跳转到所属分类列表
        res.redirect('/admin/itemList');
    })
}

// 删除所属分类数据
adminController.itemRemove = function (req, res) {
     // 判断登没登陆             如果没登录   跳转到登录页面 
     
    // 数据库删除的操作 
    itemModel.remove({ _id: req.params._id }, function (error) {
        if (error) {
            res.send(error)
        } else {
            // 跳转到所属分类列表
            res.redirect('/admin/itemList');
        }
    })
}

// 发布签名页面
adminController.articleAdd = function (req, res) {
     // 判断登没登陆             如果没登录   跳转到登录页面 
     
    // 获取栏目列表
    itemModel.find().sort({ order: 1 }).exec(function (err, data) {
        if (err) {
            console.log('数据添加数据失败');
        } else {
            // 响应模版
            res.render('admin/articleAdd', { itemlist: data });
        }
    })
}

// 插入 签名数据
adminController.articleInsert = function (req, res) {
     // 判断登没登陆             如果没登录   跳转到登录页面 
     
    // 引入图片上传配置
    var imgUpload = require('../configs/imgUpload_config.js');

    // 文件上传的路径
    var imgPath = 'imgUploads'
    // 允许用户上传的图片
    var imgArr = ['image/jpeg', 'image/png', 'image/gif'];
    // 定义文件大小
    var fileSize = 1024 * 1024 * 4;

    // 图片上传
    var upload = imgUpload(imgPath, imgArr, fileSize).single('imgurl');
    upload(req, res, function (err) {
        if (err) {
            res.send('图片上传失败');
        } else {
            // 把用户上传的图片路径写到 req.body 里
            req.body.imgurl = req.file.filename;

            // 插入数据到数据库
            articleModel.create(req.body, function (err) {
                if (err) {
                    console.log('数据添加数据失败');
                } else {
                    // res.send('数据插入成功');
                    // 跳转到首页
                    res.redirect('/admin/articleList');
                }
            })
        }
    })
}


// 签名列表
adminController.articleList = function (req, res) {
     // 判断登没登陆             如果没登录   跳转到登录页面 
     
    // 每页显示多少条数据
    var pageSize = 6;
    // 当前页
    var page = req.query.page ? req.query.page : 1;
    // 一共有多少条数据
    articleModel.find().count(function (errr, total) {
        // 最大页码
        var maxPage = Math.ceil(total / pageSize)
        // 判断上一页和下一页边界
        if (page < 1) page = 1;
        if (page > maxPage) page = maxPage;
        // 偏移量（就哪条数据开始查）
        var offset = pageSize * (page - 1)
        // res.send('签名列表');  // populate 去查关联的集合
        articleModel.find().limit(pageSize).skip(offset).populate('itemId', { name: 1 }).exec(function (err, data) {
            if (err) {
                console.log('数据添加数据失败');
            } else {
                // 响应模版 发送数据
                res.render('admin/articleList', { articlelist: data, maxPage: maxPage, page: Number(page) });
                
            }
        })
    })
}
// 删除签名
adminController.articleRemove = function (req, res) {
     // 判断登没登陆             如果没登录   跳转到登录页面 
     
    // 数据库删除的操作 
    articleModel.remove({ _id: req.params._id }, function (error) {
        if (error) {
            res.send(error)
        } else {
            // 跳转到签名列表
            res.redirect('/admin/articleList');
        }
    })
}
// 编辑签名的页面
adminController.articleEdit = function (req, res) {
     // 判断登没登陆             如果没登录   跳转到登录页面 
     
    // 查询需要编辑的数据
    articleModel.find({ _id: req.params._id }, function (err, data) {
        if (err) {
            res.send('查询数据失败')
        } else {
            // 获取签名列表
            itemModel.find().sort({ order: 1 }).exec(function (err, itemdata) {
                if (err) {
                    console.log('数据添加数据失败');
                } else {
                    // 响应模版 分配数据
                    res.render('admin/articleEdit', { data: data[0], itemlist: itemdata });
                }
            })
        }
    })
}

// 修改签名文本
adminController.articleUpdate = function (req, res) {
     // 判断登没登陆             如果没登录   跳转到登录页面 
     
    // 更新数据
    articleModel.update({ _id: req.body._id }, { $set: req.body }, function (error) {
        // 跳转到签名列表
        res.redirect('/admin/articleList');
    })
}
// 修改签名的图片
adminController.articleUpdateImage = function (req, res) {
     // 判断登没登陆             如果没登录   跳转到登录页面 
     
    // 引入图片上传配置
    var imgUpload = require('../configs/imgUpload_config.js');
    // 文件上传的路径
    var imgPath = 'imgUploads'
    // 允许用户上传的图片
    var imgArr = ['image/jpeg', 'image/png', 'image/gif'];
    // 定义文件大小
    var fileSize = 1024 * 1024 * 4;
    // 图片上传
    var upload = imgUpload(imgPath, imgArr, fileSize).single('imgurl');
    upload(req, res, function (err) {
        if (err) {
            res.send('图片上传失败');
        } else {
            // 修改指定签名的封面
            articleModel.update({ _id: req.body._id }, { $set: { imgurl: req.file.filename } }, function (error) {
                if (error) {
                    console.log('数据添加数据失败');
                } else {
                    // 跳转到首页
                    res.redirect('/admin/articleList');
                }
            })
        }
    })
}
// 验证码
adminController.code = function (req, res) {
    // 引入验证码模块
    var captchapng = require('captchapng');
    // 随机生成图片里的验证码
    var code = parseInt(Math.random() * 9000 + 1000);
    // 存到   session  里
    req.session.code = code;
    //  实例化验证码对象
    var p = new captchapng(80, 30, code); 
    p.color(0, 0, 0, 0);  
    p.color(80, 80, 80, 255); 
    // 生成图片
    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    // 发送数据
    res.send(imgbase64);
}
// 友情链接列表
adminController.loveList = function (req, res) {
     // 判断登没登陆             如果没登录   跳转到登录页面 
     
    // 获取友情链接列表
    loveModel.find().sort({ order: 1 }).exec(function (err, data) {
        if (err) {
            console.log('数据添加数据失败');
        } else {
            // 响应模版 分配数据
            res.render('admin/loveList', { datalist: data })
        }
    })
}
// 添加友情分类
adminController.loveAdd = function (req, res) {
     // 判断登没登陆             如果没登录   跳转到登录页面 
     
    // 响应模版
    res.render('admin/loveAdd');
}
 // 插入友情分类数据
adminController.loveInsert = function (req, res) {
     // 判断登没登陆             如果没登录   跳转到登录页面 
     
    // 插入数据到数据库
    loveModel.create(req.body, function (err) {
        if (err) {
            console.log('数据添加数据失败');
        } else {
            console.log('数据插入成功');
            // 跳转到首页
            res.redirect('/admin/loveList');
        }
    })
}
// 编辑友情分类页面
adminController.loveEdit = function (req, res) {
     // 判断登没登陆             如果没登录   跳转到登录页面 
     
    // 查询要编辑的数据
    loveModel.find({ _id: req.params._id }, function (err, data) {
        if (err) {
            res.send('查询数据失败')
        } else {
            // 响应模版
            res.render('admin/loveEdit', { data: data[0] });
        }
    })
}
// 修改友情分类
adminController.loveUpdate = function (req, res) {
     // 判断登没登陆             如果没登录   跳转到登录页面 
     
    // 更新数据
    loveModel.update({ _id: req.body._id }, req.body, function (error) {
        // 跳转到栏目列表
        res.redirect('/admin/loveList');
    })
}
// 删除友情分类
adminController.loveRemove = function (req, res) {
     // 判断登没登陆             如果没登录   跳转到登录页面 
     
    // 数据库删除的操作 
    loveModel.remove({ _id: req.params._id }, function (error) {
        if (error) {
            res.send(error)
        } else {
            // 跳转到友情分类列表
            res.redirect('/admin/loveList');
        }
    })
}
// 发布友情链接页面
adminController.sendAdd = function (req, res) {
     // 判断登没登陆             如果没登录   跳转到登录页面 
     
    // 获取栏目列表
    loveModel.find().sort({ order: 1 }).exec(function (err, data) {
        if (err) {
            console.log('数据添加数据失败');
        } else {
            // 响应模版
            res.render('admin/sendAdd', { lovelist: data });
        }
    })
}
// 插入 链接数据
adminController.sendInsert = function (req, res) {
     // 判断登没登陆             如果没登录   跳转到登录页面 
     
    // console.log(req.body);
    // 插入数据到数据库
    sendModel.create(req.body, function (err) {
        if (err) {
            console.log('数据添加数据失败');
        } else {
            // res.send('数据插入成功');
            // 跳转到友情链接列表
            res.redirect('/admin/sendList');
        }
    })
}
// 友情链接列表
adminController.sendList = function (req, res) {
     // 判断登没登陆             如果没登录   跳转到登录页面 
     
    // 每页显示多少条数据
    var pageSize = 3;
    // 当前页
    var page = req.query.page ? req.query.page : 1;
    // 一共有多少条数据
    sendModel.find().count(function (errr, total) {
        // 最大页码
        var maxPage = Math.ceil(total / pageSize)
        // 判断上一页和下一页边界
        if (page < 1) page = 1;
        if (page > maxPage) page = maxPage;
        // 偏移量（就哪条数据开始查）
        var offset = pageSize * (page - 1)
        // res.send('友情链接列表');  // populate 去查关联的集合
        sendModel.find().limit(pageSize).skip(offset).populate('loveId', { name: 1 }).exec(function (err, data) {
            if (err) {
                console.log('数据添加数据失败');
            } else {
                // 响应模版 发送数据
                res.render('admin/sendList', { sendlist: data, maxPage: maxPage, page: Number(page) });
            }
        })
    })
}
// 编辑友情链接页面
adminController.sendEdit = function (req, res) {
     // 判断登没登陆             如果没登录   跳转到登录页面 
    //  if(!req.session.user) res.redirect('/admin/login');
    // 查询需要编辑的数据
    sendModel.find({ _id: req.params._id }, function (err, data) {
        if (err) {
            res.send('查询数据失败')
        } else {
            // 获取分类列表
            loveModel.find().sort({ order: 1 }).exec(function (err, lovedata) {
                if (err) {
                    console.log('数据添加数据失败');
                } else {
                    // 响应模版 分配数据
                    res.render('admin/sendEdit', { data: data[0], lovelist: lovedata });
                }
            })
        }
    })
}
// 修改友情链接
adminController.sendUpdate = function (req, res) {
     // 判断登没登陆             如果没登录   跳转到登录页面 
     
    // 更新数据
    sendModel.update({ _id: req.body._id }, req.body, function (error) {
        // 跳转到链接列表
        res.redirect('/admin/sendList');
    })
}
// 删除友情链接
adminController.sendRemove = function (req, res) {
     // 判断登没登陆             如果没登录   跳转到登录页面 
     
    // 数据库删除的操作 
    sendModel.remove({ _id: req.params._id }, function (error) {
        if (error) {
            res.send(error)
        } else {
            // 跳转到友情分类列表
            res.redirect('/admin/sendList');
        }
    })
}
// 暴露控制器
module.exports = adminController;