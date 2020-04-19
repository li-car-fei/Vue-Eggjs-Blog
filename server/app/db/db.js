module.exports = app => {
    const mongoose = require('mongoose')

    // 连接数据库
    mongoose.connect('mongodb://127.0.0.1:27017', {
        useNewUrlParser: true,    //如果在用户遇到 bug 时，允许用户在新的解析器中返回旧的解析器
        useUnifiedTopology: true,   //选择使用 MongoDB 驱动程序的新连接管理引擎
        dbName: 'myblog'         // 数据库名
    });

    // __dirname：    获得当前执行文件所在目录的完整目录名
    //const models = require('require-all')(__dirname + '/../models')
}