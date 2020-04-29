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

    async fav_in_article(){
        const { ctx } = this;
        // 先拿到文章的 _id
        const id = ctx.params.id;
        const data=await ctx.service.index.fav_in_article(id);

        ctx.body=data;
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
}

module.exports = IndexController;
