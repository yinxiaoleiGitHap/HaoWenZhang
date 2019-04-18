// 引入数据库配置模块
var mongoose = require('../configs/db_config.js');

// 定义 user 数据的 骨架(用来约束 love 这个集合的)
var loveSchema = new mongoose.Schema({
    // 类别名称
    name: String,
    // 创建时间
    ctime: {
        type: Date,
        default: new Date()   // 默认值
    },
    //链接地址
    dizhi:String, 
    // 排序
    order: Number,
    // 介绍
    description: String,
})

// 3.创建数据库模型      
var loveModel = mongoose.model('love', loveSchema);

// 暴露数据库模型
module.exports = loveModel;