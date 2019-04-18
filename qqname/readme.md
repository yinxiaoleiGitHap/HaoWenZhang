# 开发好文章文章  （CMS）

## 使用到的技术
    html   css  javascript (bootstrap)   node.js(express)  mnogoDB(mongoose)

## M V C     mvcr




## 功能
    前台（用户浏览的页面）
        首页、列表页（频道页）、内容页
        （文章需要关联 在 栏目下）
        显示友情链接

        栏目的导航要可以排序

        分页
        
    后台（管理员的页面） 
        注册、登录  密码的加密  验证码
        管理员 要对  栏目 添加  删除 修改  查询的操作
        管理员 要对  文章 发布  删除 修改  查询的操作
                    友情链接  增删改查

        文件上传

        。。。

## 网站的目录结构
--|bin/                             启动项目录
--|--|www                           项目启动项
--|configs/                         配置文件目录
--|--|db_config.js                  数据库的配置文件
--|--|imgUpload_config.js           图片上传配置文件
--|controllers/                     控制器文件夹
--|--|adminController.js            后台（管理员）控制器
--|--|indexController.js            前台控制器
--|--|imgUploads/                   接收图片的文件夹
--|models/                          数据库模型文件目录
--|--|itemModel.js                  分类数据模型
--|--|articleModel.js               签名数据模型
--|--|adminModel.js                 管理员数据模型
--|node_modules/                    项目依赖的模块目录
--|public/                          静态资源库
--|--|assets/                       后台主体页面的模版资源
--|--|images/                       图片
--|--|css/                          css
--|--|js/                           js
--|--|font/                         项目的字体库
--|--|ueditor/                      百度富文本 插件
--|routes/                          路由目录
--|--|admin.js                      后台的路由文件
--|--|index.js                      前台的路由文件
--|--|test.js                       测试功能的路由文件
--|views/                           模版目录
--|--|admin/                        管理员的模版目录
--|--|--|header.ejs                 后台公用的头部模版
--|--|--|footer.ejs                 后台公用的底部模版
--|--|test/                         测试功能的模版目录
--|app.js                           入口文件
--|package.json                     配置文件
--|readme.md                        项目介绍  


## 设计数据库

### articles  文章集合
    属性                类型            描述
    _id                 ObjectId              
    itemId              ObjectId        栏目Id    
    title               String          文章标题
    author              String          作者
    content             String          文章内容
    keywords            String          关键字
    description         String          描述
    ctime               Date            发布事件
    imgurl              String          封面


### items  栏目集合
    属性                类型             描述
    _id                 ObjectId                            
    name                String          名称
    ctime               Date            创建时间
    description         String          描述


### admin 管理员的集合
    属性                        描述
    _id 
    username    String          账号
    password    String          密码
    tel         String          电话
    ctime       Date            添加时间



# 会话控制   
> 会话控制.md


# md5


# 扩展练习

    怎么判断 是登录成功了，还是登录失败了
