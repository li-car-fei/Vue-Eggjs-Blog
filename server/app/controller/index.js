'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
    async get_all_articles() {
        const { ctx } = this;
        const data = await ctx.service.index.get_all_articles();

        ctx.body = data;
    }

    async get_top_articles() {
        const { ctx } = this;
        const data = await ctx.service.index.get_top_articles();

        ctx.body = data;
    }

    async get_pageNum_articles() {
        const { ctx } = this;
        // 先拿到请求的页码
        const pageNum = ctx.params.pageNum;
        const data = await ctx.service.index.get_pageNum_articles(pageNum);

        ctx.body = data;
    }

    async get_article_detail() {
        const { ctx } = this;
        // 先拿到文章的 _id
        const id = ctx.params.id;
        const data = await ctx.service.index.get_article_detail(id);

        ctx.body = data;
    }

    async fav_in_article() {
        const { ctx } = this;
        // 先拿到文章的 _id
        const id = ctx.params.id;
        const data = await ctx.service.index.fav_in_article(id);

        ctx.body = data;
    }

    async get_years_articles() {
        const { ctx } = this;
        const data = await ctx.service.index.get_years_articles();

        ctx.body = data;
    }

    async get_tags_articles() {
        const { ctx } = this;
        const data = await ctx.service.index.get_tags_articles();

        ctx.body = data;
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

        const result = await ctx.service.index.login(username, password);

        // 看看result
        console.log(result);

        if (result.token) {
            ctx.token = result.token;
            ctx.user = result.user;
            ctx.body = result;
            return
        }

        ctx.body = result;
    }

    async get_user_info() {
        const { ctx } = this;
        const user_id = ctx.params.id

        const user = ctx.cookies.get('user');
        console.log(user);

        const result = await ctx.service.index.get_user_info(user_id);

        ctx.body = result
    }

    async user_comment(){
        const { ctx } = this;
        console.log(ctx.request.body)

        const result=await ctx.service.index.user_comment(ctx.request.body)

        ctx.body=result
    }
}

module.exports = IndexController;
