'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const pump = require('mz-modules/pump')

class AdminController extends Controller {
    async get_source() {
        const { ctx } = this;

        //console.log(ctx.Model);

        const data = await ctx.service.admin.get_source(ctx.Model);

        //console.log(data);

        ctx.body = data;
    }

    async get_source_id() {
        const { ctx } = this;

        //console.log(ctx.resource_id);

        const data = await ctx.service.admin.get_source_id(ctx.Model, ctx.resource_id);

        //console.log(data);

        ctx.body = data;

    }

    async create_source() {
        const { ctx } = this;

        //console.log(ctx.request.body);

        const result = await ctx.service.admin.create_source(ctx.Model, ctx.request.body);

        //console.log(result);

        if (result) {
            // 搞个response中间件设置status

            ctx.body = '添加成功';
        }
    }

    async dele_source() {
        const { ctx } = this;

        const result = await ctx.service.admin.dele_source(ctx.Model, ctx.resource_id);
        if (result) {

            ctx.body = '删除成功';
        }
    }

    async update_source() {
        const { ctx } = this;

        //console.log(ctx.request.body);

        const result = await ctx.service.admin.update_source(ctx.Model, ctx.resource_id, ctx.request.body);

        //console.log(result);

        if (result) {
            ctx.body = '更新成功';
        }
    }

    async login() {
        const { ctx } = this;

        const { username, password } = ctx.request.body;

        console.log(username, password);

        // 用户名为空
        if (!username) {
            ctx.body = '用户名为空';
            return
        };

        // 密码为空
        if (!password) {
            ctx.body = '密码为空';
            return
        };

        const result = await ctx.service.admin.login(username, password);

        // 看看result
        //console.log(result);

        if (result.token) {
            ctx.token = result.token;
            ctx.body = result;
            return
        }

        ctx.body = result;


    }

    async uploadImg() {
        let parts = this.ctx.multipart({ autoFields: true });
        let stream
        let fileUrl
        //, img_list = [];//图片访问地址集合
        while ((stream = await parts()) != null) {
            // 如果不是文件，继续循环
            if (!stream.filename) {
                break;
            }
            // 文件名为：时间戳+随机字符串+.文件后缀
            let filename = (new Date()).getTime() + Math.random().toString(36).substr(2) + path.extname(stream.filename).toLocaleLowerCase();
            // 上传图片的目录
            let target = 'app/public/avator/' + filename;
            fileUrl = 'http://127.0.0.1:7001/public/avator/' + filename
            //img_list.push('/public/upload/' + filename);
            let writeStream = fs.createWriteStream(target);
            await pump(stream, writeStream);
        }
        //console.log(parts.field) // 表单其他数据，userid

        // 把地址存入mongodb
        const result = await this.ctx.service.admin.update_userImg(parts.field.userid, fileUrl);

        this.ctx.body = fileUrl;
    }

    async uploadMarkdownImg() {
        let parts = this.ctx.multipart({ autoFields: true });
        let stream
        let fileUrl
        while ((stream = await parts()) != null) {
            if (!stream.filename) {
                break;
            }
            let filename = (new Date()).getTime() + Math.random().toString(36).substr(2) + path.extname(stream.filename).toLocaleLowerCase();
            let target = 'app/public/markdown/' + filename;
            fileUrl = 'http://127.0.0.1:7001/public/markdown/' + filename
            let writeStream = fs.createWriteStream(target);
            await pump(stream, writeStream);
        };
        this.ctx.body = fileUrl
    }


}

module.exports = AdminController;
