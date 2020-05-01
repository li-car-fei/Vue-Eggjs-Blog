'use strict';

// 加密用的bcrypt
const bcrypt = require('bcryptjs');

// jwt token 
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

const User = require('../models/User');

const Service = require('egg').Service;

class AdminService extends Service {
    async get_source(Model) {
        console.log(Model);
        const data = await Model.find();
        console.log('查找成功')
        return data
    }

    async get_source_id(Model, id) {
        const data = await Model.findById(id);
        return data
    }

    async create_source(Model, data) {
        const result = await Model.create(data);
        return result
    }

    async dele_source(Model, id) {
        const result = await Model.findByIdAndDelete(id);
        //console.log(result);
        return result
    }

    async update_source(Model, id, data) {
        const result = await Model.findByIdAndUpdate(id, data);
        //console.log(result);    // 返回原本的数据
        return result
    }

    async login(username, password) {
        // 查询user， 带上password返回
        const user = await User.findOne({ username }).select('+password');
        //console.log(user);
        if (!user) {
            return '用户名错误'
        };

        // 验证密码是否正确
        const isValid = bcrypt.compareSync(password, user.password);
        if (!isValid) {
            return '密码错误'
        };

        // 根据用户的 _id 生成jwt token并返回

        // 拿到key                    config.keys.split('_')[1];
        const key = this.app.config.keys.split('_')[1];
        // 加密
        const token = jwt.sign({ id: user._id }, key);
        return {
            message: '登录成功',
            username:user.username,
            token: token
        }

    }
}

module.exports = AdminService;
