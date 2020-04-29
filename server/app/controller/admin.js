'use strict';

const Controller = require('egg').Controller;

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

        console.log(data);

        ctx.body = data;

    }

    async create_source() {
        const { ctx } = this;

        console.log(ctx.request.body);

        const result = await ctx.service.admin.create_source(ctx.Model, ctx.request.body);

        console.log(result);

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

        console.log(ctx.request.body);

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
        console.log(result);

        if (result.token) {
            ctx.token = result.token;
            ctx.body = result;
            return
        }

        ctx.body = result;


    }
}

module.exports = AdminController;
