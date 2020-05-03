'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {

    // 获取轻安布文章内容
    async get_all_articles() {
        const { ctx } = this;
        const data = await ctx.service.index.get_all_articles();

        ctx.body = data;
    }

    // 获取置顶文章
    async get_top_articles() {
        const { ctx } = this;
        const data = await ctx.service.index.get_top_articles();

        ctx.body = data;
    }

    // 获取指定页码文章
    async get_pageNum_articles() {
        const { ctx } = this;
        // 先拿到请求的页码
        const pageNum = ctx.params.pageNum;
        const data = await ctx.service.index.get_pageNum_articles(pageNum);

        ctx.body = data;
    }

    // 获取文章详情
    async get_article_detail() {
        const { ctx } = this;
        // 先拿到文章的 _id
        const id = ctx.params.id;
        const data = await ctx.service.index.get_article_detail(id);

        ctx.body = data;
    }

    // 点赞文章
    async fav_in_article() {
        const { ctx } = this;
        // 先拿到文章的 _id
        const id = ctx.params.id;
        const data = await ctx.service.index.fav_in_article(id);

        ctx.body = data;
    }

    // 获取年份归类的文章
    async get_years_articles() {
        const { ctx } = this;
        const data = await ctx.service.index.get_years_articles();

        ctx.body = data;
    }

    // 获取标签分类的文章
    async get_tags_articles() {
        const { ctx } = this;
        const data = await ctx.service.index.get_tags_articles();

        ctx.body = data;
    }

    // 处理登录
    async login() {
        const { ctx } = this;

        const { username, password } = ctx.request.body;

        //console.log(username, password);

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
        //console.log(result);

        if (result.user && result.token) {
            //ctx.token = result.token;
            ctx.user = result.user;
            ctx.body = result;
            return
        }

        ctx.body = result;
    }

    // 获取用户信息
    async get_user_info() {
        const { ctx } = this;

        const user = ctx.cookies.get('user');
        //console.log(user);

        const result = await ctx.service.index.get_user_info(user);

        ctx.body = result
    }

    // 用户评论当前文章
    async user_comment() {
        const { ctx } = this;
        //console.log(ctx.request.body);
        const create_data = {
            user: ctx.cookies.get('user'),
            article: ctx.request.body.article,
            content: ctx.request.body.content
        }

        const result = await ctx.service.index.user_comment(create_data)

        ctx.body = result
    }

    async fav_in_user() {
        const { ctx } = this;

        const user_id = ctx.cookies.get('user');
        const article_id = ctx.params.id;

        const result = await ctx.service.index.fav_in_user(user_id, article_id);
        //console.log(result);

        ctx.body = {
            result
        }
    }

    async user_fav_push() {
        const { ctx } = this;
        const { article_id, user_fav_change } = ctx.request.body;
        //console.log(article_id, user_fav_change);

        const user_id = ctx.cookies.get('user');

        const result = await ctx.service.index.user_fav_change(article_id, user_id, user_fav_change);
        //console.log(result);

        ctx.body = result
    }
}

module.exports = IndexController;
